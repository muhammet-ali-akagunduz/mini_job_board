package com.minijobboard.controller;

import com.minijobboard.dto.JobCreateRequest;
import com.minijobboard.dto.JobDTO;
import com.minijobboard.entity.WorkplaceType;
import com.minijobboard.entity.EmploymentType;
import com.minijobboard.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<JobDTO>> getAllJobs(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) WorkplaceType workplaceType,
            @RequestParam(required = false) EmploymentType employmentType) {
        return ResponseEntity.ok(jobService.getAllJobs(search, location, workplaceType, employmentType));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<?> createJob(@Valid @RequestBody JobCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobService.createJob(request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok(Map.of("message", "Job deleted successfully!"));
    }

    @PostMapping("/{id}/save")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<?> saveJob(@PathVariable Long id) {
        jobService.saveJob(id);
        return ResponseEntity.ok(Map.of("message", "Job saved successfully!"));
    }

    @DeleteMapping("/{id}/save")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<?> unsaveJob(@PathVariable Long id) {
        jobService.unsaveJob(id);
        return ResponseEntity.ok(Map.of("message", "Job removed from saved list!"));
    }

    @GetMapping("/saved")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<List<JobDTO>> getSavedJobs() {
        return ResponseEntity.ok(jobService.getSavedJobs());
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<List<JobDTO>> getMyPostedJobs() {
        return ResponseEntity.ok(jobService.getMyPostedJobs());
    }
}
