package com.minijobboard.service;

import com.minijobboard.dto.ApplicationDTO;
import com.minijobboard.dto.ApplicationStatusRequest;
import com.minijobboard.entity.*;
import com.minijobboard.exception.ResourceNotFoundException;
import com.minijobboard.exception.UnauthorizedActionException;
import com.minijobboard.repository.ApplicationRepository;
import com.minijobboard.repository.JobRepository;
import com.minijobboard.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                              JobRepository jobRepository,
                              UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    public ApplicationDTO applyToJob(Long jobId) {
        User candidate = getCurrentUser();
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));

        if (applicationRepository.findByJobIdAndCandidateId(jobId, candidate.getId()).isPresent()) {
            throw new IllegalArgumentException("You have already applied to this job!");
        }

        Application application = Application.builder()
                .job(job)
                .candidate(candidate)
                .status(ApplicationStatus.PENDING)
                .appliedAt(LocalDateTime.now())
                .build();

        Application savedApp = applicationRepository.save(application);
        return convertToDTO(savedApp);
    }

    public List<ApplicationDTO> getMyApplications() {
        User candidate = getCurrentUser();
        List<Application> apps = applicationRepository.findByCandidateIdOrderByAppliedAtDesc(candidate.getId());
        return apps.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ApplicationDTO> getEmployerApplications() {
        User employer = getCurrentUser();
        List<Application> apps = applicationRepository.findByJobEmployerIdOrderByAppliedAtDesc(employer.getId());
        return apps.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ApplicationDTO updateApplicationStatus(Long id, ApplicationStatusRequest request) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));

        User employer = getCurrentUser();
        if (!application.getJob().getEmployer().getId().equals(employer.getId())) {
            throw new UnauthorizedActionException("You cannot update this application!");
        }

        application.setStatus(request.getStatus());
        Application updatedApp = applicationRepository.save(application);
        return convertToDTO(updatedApp);
    }

    private ApplicationDTO convertToDTO(Application app) {
        String statusFormatted = app.getStatus().name().substring(0, 1).toUpperCase() + app.getStatus().name().substring(1).toLowerCase();

        return ApplicationDTO.builder()
                .id(app.getId())
                .jobId(app.getJob().getId())
                .jobTitle(app.getJob().getTitle())
                .company(app.getJob().getCompany())
                .candidateName(app.getCandidate().getFullName())
                .candidateEmail(app.getCandidate().getEmail())
                .candidateId(app.getCandidate().getId())
                .status(statusFormatted)
                .appliedAt(app.getAppliedAt().toLocalDate().toString())
                .build();
    }
}
