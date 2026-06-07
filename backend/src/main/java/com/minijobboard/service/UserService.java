package com.minijobboard.service;

import com.minijobboard.dto.UserProfileUpdateRequest;
import com.minijobboard.entity.User;
import com.minijobboard.exception.ResourceNotFoundException;
import com.minijobboard.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String getCurrentUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public User getCurrentUser() {
        String email = getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    public Map<String, Object> getProfile() {
        User user = getCurrentUser();
        return buildProfileMap(user, true);
    }

    public Map<String, Object> getPublicProfile(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return buildProfileMap(user, false);
    }

    public Map<String, Object> updateProfile(UserProfileUpdateRequest request) {
        User user = getCurrentUser();
        user.setFullName(request.getFullName());

        if (request.getHeadline() != null) user.setHeadline(request.getHeadline());
        if (request.getLocation() != null) user.setLocation(request.getLocation());
        if (request.getAbout() != null) user.setAbout(request.getAbout());
        if (request.getBannerUrl() != null) user.setBannerUrl(request.getBannerUrl());
        if (request.getAvatarUrl() != null) user.setAvatarUrl(request.getAvatarUrl());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Profile updated successfully!");
        response.put("fullName", user.getFullName());
        return response;
    }

    private Map<String, Object> buildProfileMap(User user, boolean includeEmail) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        if (includeEmail) {
            response.put("email", user.getEmail());
        }
        response.put("fullName", user.getFullName());
        response.put("role", user.getRole().name());
        response.put("headline", user.getHeadline() != null ? user.getHeadline() : "");
        response.put("location", user.getLocation() != null ? user.getLocation() : "");
        response.put("about", user.getAbout() != null ? user.getAbout() : "");
        response.put("bannerUrl", user.getBannerUrl() != null ? user.getBannerUrl() : "");
        response.put("avatarUrl", user.getAvatarUrl() != null ? user.getAvatarUrl() : "");
        response.put("experiences", user.getExperiences());
        response.put("educations", user.getEducations());
        response.put("certifications", user.getCertifications());
        response.put("skills", user.getSkills());
        response.put("recommendations", user.getRecommendations());
        return response;
    }
}
