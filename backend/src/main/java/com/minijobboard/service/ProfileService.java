package com.minijobboard.service;

import com.minijobboard.entity.*;
import com.minijobboard.exception.ResourceNotFoundException;
import com.minijobboard.exception.UnauthorizedActionException;
import com.minijobboard.repository.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProfileService {

    private final UserRepository userRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final CertificationRepository certificationRepository;
    private final SkillRepository skillRepository;

    public ProfileService(UserRepository userRepository,
                          ExperienceRepository experienceRepository,
                          EducationRepository educationRepository,
                          CertificationRepository certificationRepository,
                          SkillRepository skillRepository) {
        this.userRepository = userRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.certificationRepository = certificationRepository;
        this.skillRepository = skillRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    // Experience
    public Experience addExperience(Experience exp) {
        User user = getCurrentUser();
        exp.setUser(user);
        return experienceRepository.save(exp);
    }

    public void deleteExperience(Long id) {
        Experience exp = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));
        User user = getCurrentUser();
        if (!exp.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedActionException("You are not authorized to delete this experience!");
        }
        experienceRepository.delete(exp);
    }

    // Education
    public Education addEducation(Education edu) {
        User user = getCurrentUser();
        edu.setUser(user);
        return educationRepository.save(edu);
    }

    public void deleteEducation(Long id) {
        Education edu = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found with id: " + id));
        User user = getCurrentUser();
        if (!edu.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedActionException("You are not authorized to delete this education!");
        }
        educationRepository.delete(edu);
    }

    // Certification
    public Certification addCertification(Certification cert) {
        User user = getCurrentUser();
        cert.setUser(user);
        return certificationRepository.save(cert);
    }

    public void deleteCertification(Long id) {
        Certification cert = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification not found with id: " + id));
        User user = getCurrentUser();
        if (!cert.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedActionException("You are not authorized to delete this certification!");
        }
        certificationRepository.delete(cert);
    }

    // Skill
    public Skill addSkill(Skill skill) {
        User user = getCurrentUser();
        skill.setUser(user);
        return skillRepository.save(skill);
    }

    public void deleteSkill(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
        User user = getCurrentUser();
        if (!skill.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedActionException("You are not authorized to delete this skill!");
        }
        skillRepository.delete(skill);
    }
}
