package com.minijobboard.controller;

import com.minijobboard.dto.UserProfileUpdateRequest;
import com.minijobboard.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getProfile() {
        return ResponseEntity.ok(userService.getProfile());
    }

    @GetMapping("/{id}/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getPublicProfile(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getPublicProfile(id));
    }

    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UserProfileUpdateRequest request) {
        Map<String, Object> response = userService.updateProfile(request);
        return ResponseEntity.ok(response);
    }
}
