package com.minijobboard.controller;

import com.minijobboard.entity.*;
import com.minijobboard.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@PreAuthorize("isAuthenticated()")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/experiences")
    public ResponseEntity<?> addExperience(@RequestBody Experience exp) {
        return ResponseEntity.ok(profileService.addExperience(exp));
    }

    @DeleteMapping("/experiences/{id}")
    public ResponseEntity<?> deleteExperience(@PathVariable Long id) {
        profileService.deleteExperience(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/educations")
    public ResponseEntity<?> addEducation(@RequestBody Education edu) {
        return ResponseEntity.ok(profileService.addEducation(edu));
    }

    @DeleteMapping("/educations/{id}")
    public ResponseEntity<?> deleteEducation(@PathVariable Long id) {
        profileService.deleteEducation(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/certifications")
    public ResponseEntity<?> addCertification(@RequestBody Certification cert) {
        return ResponseEntity.ok(profileService.addCertification(cert));
    }

    @DeleteMapping("/certifications/{id}")
    public ResponseEntity<?> deleteCertification(@PathVariable Long id) {
        profileService.deleteCertification(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/skills")
    public ResponseEntity<?> addSkill(@RequestBody Skill skill) {
        return ResponseEntity.ok(profileService.addSkill(skill));
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {
        profileService.deleteSkill(id);
        return ResponseEntity.ok().build();
    }
}
