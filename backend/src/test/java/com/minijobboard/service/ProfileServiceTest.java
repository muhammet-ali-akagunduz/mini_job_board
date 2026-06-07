package com.minijobboard.service;

import com.minijobboard.entity.Experience;
import com.minijobboard.entity.Role;
import com.minijobboard.entity.User;
import com.minijobboard.exception.ResourceNotFoundException;
import com.minijobboard.exception.UnauthorizedActionException;
import com.minijobboard.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProfileServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ExperienceRepository experienceRepository;

    @Mock
    private EducationRepository educationRepository;

    @Mock
    private CertificationRepository certificationRepository;

    @Mock
    private SkillRepository skillRepository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private ProfileService profileService;

    private User currentUser;
    private User otherUser;

    @BeforeEach
    void setUp() {
        SecurityContextHolder.setContext(securityContext);
        
        currentUser = User.builder()
                .id(1L)
                .fullName("John Doe")
                .email("john@example.com")
                .password("password")
                .role(Role.CANDIDATE)
                .build();

        otherUser = User.builder()
                .id(2L)
                .fullName("Jane Smith")
                .email("jane@example.com")
                .password("password")
                .role(Role.CANDIDATE)
                .build();
    }

    @Test
    void testAddExperience_Success() {
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("john@example.com");
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(currentUser));

        Experience exp = new Experience();
        exp.setRole("Developer");
        exp.setCompany("Tech Corp");

        when(experienceRepository.save(any(Experience.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Experience saved = profileService.addExperience(exp);

        assertNotNull(saved);
        assertEquals(currentUser, saved.getUser());
        assertEquals("Developer", saved.getRole());
        verify(experienceRepository, times(1)).save(exp);
    }

    @Test
    void testDeleteExperience_Success() {
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("john@example.com");
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(currentUser));

        Experience exp = new Experience();
        exp.setId(10L);
        exp.setUser(currentUser);

        when(experienceRepository.findById(10L)).thenReturn(Optional.of(exp));

        profileService.deleteExperience(10L);

        verify(experienceRepository, times(1)).delete(exp);
    }

    @Test
    void testDeleteExperience_ThrowsUnauthorizedException() {
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("john@example.com");
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(currentUser));

        Experience exp = new Experience();
        exp.setId(10L);
        exp.setUser(otherUser); // Owned by Jane, not John

        when(experienceRepository.findById(10L)).thenReturn(Optional.of(exp));

        assertThrows(UnauthorizedActionException.class, () -> {
            profileService.deleteExperience(10L);
        });

        verify(experienceRepository, never()).delete(any());
    }

    @Test
    void testDeleteExperience_ThrowsNotFoundException() {
        when(experienceRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            profileService.deleteExperience(99L);
        });

        verify(experienceRepository, never()).delete(any());
    }
}
