package com.minijobboard.service;

import com.minijobboard.dto.JobCreateRequest;
import com.minijobboard.dto.JobDTO;
import com.minijobboard.entity.*;
import com.minijobboard.exception.ResourceNotFoundException;
import com.minijobboard.exception.UnauthorizedActionException;
import com.minijobboard.repository.ApplicationRepository;
import com.minijobboard.repository.JobRepository;
import com.minijobboard.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;

    public JobService(JobRepository jobRepository,
                      UserRepository userRepository,
                      ApplicationRepository applicationRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getName().equals("anonymousUser")) {
            return null;
        }
        return userRepository.findByEmail(auth.getName()).orElse(null);
    }

    public List<JobDTO> getAllJobs(String search, String location, WorkplaceType workplaceType, EmploymentType employmentType) {
        List<Job> jobs = jobRepository.searchJobs(search, location, workplaceType, employmentType);
        User currentUser = getCurrentUser();
        Map<Long, Long> applicantCounts = getApplicantCounts(jobs);

        return jobs.stream()
                .map(job -> convertToDTO(job, currentUser, applicantCounts))
                .collect(Collectors.toList());
    }

    public JobDTO getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        User currentUser = getCurrentUser();
        Map<Long, Long> applicantCounts = getApplicantCounts(Collections.singletonList(job));
        return convertToDTO(job, currentUser, applicantCounts);
    }

    public JobDTO createJob(JobCreateRequest request) {
        User employer = getCurrentUser();
        if (employer == null) {
            throw new UnauthorizedActionException("You must be authenticated to create a job!");
        }

        Job job = Job.builder()
                .title(request.getTitle())
                .company(request.getCompany())
                .location(request.getLocation())
                .workplaceType(request.getWorkplaceType())
                .employmentType(request.getEmploymentType())
                .salary(request.getSalary())
                .insight("Be among the first applicants")
                .promoted(false)
                .easyApply(true)
                .description(request.getDescription())
                .responsibilities(request.getResponsibilities())
                .tags(request.getTags())
                .createdAt(LocalDateTime.now())
                .employer(employer)
                .build();

        Job savedJob = jobRepository.save(job);
        return convertToDTO(savedJob, employer, Map.of(savedJob.getId(), 0L));
    }

    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        User employer = getCurrentUser();
        if (employer == null || !job.getEmployer().getId().equals(employer.getId())) {
            throw new UnauthorizedActionException("You cannot delete this job!");
        }

        applicationRepository.deleteByJobId(id);
        userRepository.removeSavedJobReferences(id);
        jobRepository.delete(job);
    }

    public void saveJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        User user = getCurrentUser();
        if (user == null) {
            throw new UnauthorizedActionException("Authentication required!");
        }

        user.getSavedJobs().add(job);
        userRepository.save(user);
    }

    public void unsaveJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        User user = getCurrentUser();
        if (user == null) {
            throw new UnauthorizedActionException("Authentication required!");
        }

        user.getSavedJobs().removeIf(j -> j.getId().equals(id));
        userRepository.save(user);
    }

    public List<JobDTO> getSavedJobs() {
        User user = getCurrentUser();
        if (user == null) {
            throw new UnauthorizedActionException("Authentication required!");
        }

        List<Job> jobs = new ArrayList<>(user.getSavedJobs());
        Map<Long, Long> applicantCounts = getApplicantCounts(jobs);
        return jobs.stream()
                .map(job -> convertToDTO(job, user, applicantCounts))
                .collect(Collectors.toList());
    }

    public List<JobDTO> getMyPostedJobs() {
        User employer = getCurrentUser();
        if (employer == null) {
            throw new UnauthorizedActionException("Authentication required!");
        }

        List<Job> jobs = jobRepository.findByEmployerId(employer.getId());
        Map<Long, Long> applicantCounts = getApplicantCounts(jobs);
        return jobs.stream()
                .map(job -> convertToDTO(job, employer, applicantCounts))
                .collect(Collectors.toList());
    }

    private Map<Long, Long> getApplicantCounts(List<Job> jobs) {
        if (jobs == null || jobs.isEmpty()) {
            return Collections.emptyMap();
        }
        List<Long> jobIds = jobs.stream().map(Job::getId).collect(Collectors.toList());
        List<Object[]> counts = applicationRepository.countByJobIds(jobIds);
        Map<Long, Long> applicantCounts = new HashMap<>();
        for (Object[] row : counts) {
            applicantCounts.put((Long) row[0], (Long) row[1]);
        }
        return applicantCounts;
    }

    public JobDTO convertToDTO(Job job, User currentUser, Map<Long, Long> applicantCounts) {
        boolean isSaved = false;
        boolean isOwner = false;

        if (currentUser != null) {
            isSaved = currentUser.getSavedJobs().stream().anyMatch(j -> j.getId().equals(job.getId()));
            if (job.getEmployer() != null && job.getEmployer().getId().equals(currentUser.getId())) {
                isOwner = true;
            }
        }

        List<String> respList = job.getResponsibilities() != null && !job.getResponsibilities().isBlank()
                ? List.of(job.getResponsibilities().split("\\s*,\\s*"))
                : List.of();

        List<String> tagList = job.getTags() != null && !job.getTags().isBlank()
                ? List.of(job.getTags().split("\\s*,\\s*"))
                : List.of();

        LocalDateTime createdAt = job.getCreatedAt() != null ? job.getCreatedAt() : LocalDateTime.now();
        java.time.Duration duration = java.time.Duration.between(createdAt, LocalDateTime.now());
        long days = duration.toDays();
        String postedAgo = "Just now";
        if (days == 1) {
            postedAgo = "1 day ago";
        } else if (days > 1 && days < 7) {
            postedAgo = days + " days ago";
        } else if (days >= 7) {
            long weeks = days / 7;
            postedAgo = weeks == 1 ? "1 week ago" : weeks + " weeks ago";
        }

        String wt = job.getWorkplaceType().name().substring(0, 1).toUpperCase() + job.getWorkplaceType().name().substring(1).toLowerCase();
        if (wt.equals("Onsite")) wt = "On-site";

        String et = job.getEmploymentType().name().replace("_", "-");
        et = et.substring(0, 1).toUpperCase() + et.substring(1).toLowerCase();

        int applicants = applicantCounts.getOrDefault(job.getId(), 0L).intValue();

        return JobDTO.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getCompany())
                .location(job.getLocation())
                .workplaceType(wt)
                .employmentType(et)
                .salary(job.getSalary())
                .insight(job.getInsight())
                .promoted(job.isPromoted())
                .easyApply(job.isEasyApply())
                .description(job.getDescription())
                .responsibilities(respList)
                .tags(tagList)
                .postedAgo(postedAgo)
                .applicants(applicants)
                .isSaved(isSaved)
                .isOwner(isOwner)
                .build();
    }
}
