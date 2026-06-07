package com.minijobboard.service;

import com.minijobboard.dto.JobCreateRequest;
import com.minijobboard.dto.JobDTO;
import com.minijobboard.entity.*;
import com.minijobboard.exception.ResourceNotFoundException;
import com.minijobboard.exception.UnauthorizedActionException;
import com.minijobboard.repository.ApplicationRepository;
import com.minijobboard.repository.JobRepository;
import com.minijobboard.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class JobServiceTest {

    @Mock
    private JobRepository jobRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ApplicationRepository applicationRepository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private JobService jobService;

    private User employer;
    private User otherEmployer;
    private Job job;

    @BeforeEach
    void setUp() {
        SecurityContextHolder.setContext(securityContext);

        employer = User.builder()
                .id(1L)
                .fullName("Employer One")
                .email("employer1@example.com")
                .role(Role.EMPLOYER)
                .build();

        otherEmployer = User.builder()
                .id(2L)
                .fullName("Employer Two")
                .email("employer2@example.com")
                .role(Role.EMPLOYER)
                .build();

        job = Job.builder()
                .id(100L)
                .title("Software Engineer")
                .company("Test Company")
                .location("Warsaw")
                .workplaceType(WorkplaceType.HYBRID)
                .employmentType(EmploymentType.FULL_TIME)
                .employer(employer)
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    void testGetAllJobs_Success() {
        // Mock anonymous user
        when(securityContext.getAuthentication()).thenReturn(null);

        List<Job> jobsList = List.of(job);
        when(jobRepository.searchJobs(any(), any(), any(), any())).thenReturn(jobsList);
        
        List<Object[]> countResults = new ArrayList<>();
        countResults.add(new Object[]{100L, 5L}); // 5 applicants for job 100
        when(applicationRepository.countByJobIds(List.of(100L))).thenReturn(countResults);

        List<JobDTO> result = jobService.getAllJobs(null, null, null, null);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Software Engineer", result.get(0).getTitle());
        assertEquals(5, result.get(0).getApplicants());
        assertFalse(result.get(0).isOwner());
        assertFalse(result.get(0).isSaved());
    }

    @Test
    void testCreateJob_Success() {
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("employer1@example.com");
        when(userRepository.findByEmail("employer1@example.com")).thenReturn(Optional.of(employer));

        JobCreateRequest request = new JobCreateRequest();
        request.setTitle("QA Engineer");
        request.setCompany("QA Corp");
        request.setLocation("Krakow");
        request.setWorkplaceType(WorkplaceType.REMOTE);
        request.setEmploymentType(EmploymentType.PART_TIME);

        when(jobRepository.save(any(Job.class))).thenAnswer(invocation -> {
            Job saved = invocation.getArgument(0);
            saved.setId(101L);
            return saved;
        });

        JobDTO created = jobService.createJob(request);

        assertNotNull(created);
        assertEquals(101L, created.getId());
        assertEquals("QA Engineer", created.getTitle());
        assertTrue(created.isOwner()); // creator is owner
    }

    @Test
    void testDeleteJob_Success() {
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("employer1@example.com");
        when(userRepository.findByEmail("employer1@example.com")).thenReturn(Optional.of(employer));
        when(jobRepository.findById(100L)).thenReturn(Optional.of(job));

        jobService.deleteJob(100L);

        verify(applicationRepository, times(1)).deleteByJobId(100L);
        verify(userRepository, times(1)).removeSavedJobReferences(100L);
        verify(jobRepository, times(1)).delete(job);
    }

    @Test
    void testDeleteJob_ThrowsUnauthorizedException() {
        // Authenticated as OTHER employer
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("employer2@example.com");
        when(userRepository.findByEmail("employer2@example.com")).thenReturn(Optional.of(otherEmployer));
        when(jobRepository.findById(100L)).thenReturn(Optional.of(job));

        assertThrows(UnauthorizedActionException.class, () -> {
            jobService.deleteJob(100L);
        });

        verify(jobRepository, never()).delete(any());
    }

    @Test
    void testDeleteJob_ThrowsNotFoundException() {
        when(jobRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            jobService.deleteJob(999L);
        });
    }
}
