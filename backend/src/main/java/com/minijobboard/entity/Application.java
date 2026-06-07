package com.minijobboard.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"job_id", "candidate_id"})
})
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private User candidate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    @Column(name = "applied_at", nullable = false)
    private LocalDateTime appliedAt;

    public Application() {}

    public Application(Long id, Job job, User candidate, ApplicationStatus status, LocalDateTime appliedAt) {
        this.id = id;
        this.job = job;
        this.candidate = candidate;
        this.status = status;
        this.appliedAt = appliedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public User getCandidate() { return candidate; }
    public void setCandidate(User candidate) { this.candidate = candidate; }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }

    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }

    // Builder
    public static ApplicationBuilder builder() { return new ApplicationBuilder(); }

    public static class ApplicationBuilder {
        private Long id;
        private Job job;
        private User candidate;
        private ApplicationStatus status;
        private LocalDateTime appliedAt;

        public ApplicationBuilder id(Long id) { this.id = id; return this; }
        public ApplicationBuilder job(Job job) { this.job = job; return this; }
        public ApplicationBuilder candidate(User candidate) { this.candidate = candidate; return this; }
        public ApplicationBuilder status(ApplicationStatus status) { this.status = status; return this; }
        public ApplicationBuilder appliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; return this; }

        public Application build() {
            return new Application(id, job, candidate, status, appliedAt);
        }
    }
}
