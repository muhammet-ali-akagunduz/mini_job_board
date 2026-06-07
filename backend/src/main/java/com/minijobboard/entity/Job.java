package com.minijobboard.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String title;

    @NotBlank
    @Column(nullable = false)
    private String company;

    @NotBlank
    @Column(nullable = false)
    private String location;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "workplace_type", nullable = false)
    private WorkplaceType workplaceType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "employment_type", nullable = false)
    private EmploymentType employmentType;

    private String salary;
    private String insight;
    private boolean promoted;

    @Column(name = "easy_apply")
    private boolean easyApply;

    @NotBlank
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(columnDefinition = "TEXT")
    private String responsibilities;

    @Column(columnDefinition = "TEXT")
    private String tags;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id", nullable = false)
    private User employer;

    public Job() {}

    public Job(Long id, String title, String company, String location, WorkplaceType workplaceType,
               EmploymentType employmentType, String salary, String insight, boolean promoted,
               boolean easyApply, String description, String responsibilities, String tags,
               LocalDateTime createdAt, User employer) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
        this.workplaceType = workplaceType;
        this.employmentType = employmentType;
        this.salary = salary;
        this.insight = insight;
        this.promoted = promoted;
        this.easyApply = easyApply;
        this.description = description;
        this.responsibilities = responsibilities;
        this.tags = tags;
        this.createdAt = createdAt;
        this.employer = employer;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public WorkplaceType getWorkplaceType() { return workplaceType; }
    public void setWorkplaceType(WorkplaceType workplaceType) { this.workplaceType = workplaceType; }

    public EmploymentType getEmploymentType() { return employmentType; }
    public void setEmploymentType(EmploymentType employmentType) { this.employmentType = employmentType; }

    public String getSalary() { return salary; }
    public void setSalary(String salary) { this.salary = salary; }

    public String getInsight() { return insight; }
    public void setInsight(String insight) { this.insight = insight; }

    public boolean isPromoted() { return promoted; }
    public void setPromoted(boolean promoted) { this.promoted = promoted; }

    public boolean isEasyApply() { return easyApply; }
    public void setEasyApply(boolean easyApply) { this.easyApply = easyApply; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getResponsibilities() { return responsibilities; }
    public void setResponsibilities(String responsibilities) { this.responsibilities = responsibilities; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public User getEmployer() { return employer; }
    public void setEmployer(User employer) { this.employer = employer; }

    // Builder
    public static JobBuilder builder() { return new JobBuilder(); }

    public static class JobBuilder {
        private Long id;
        private String title;
        private String company;
        private String location;
        private WorkplaceType workplaceType;
        private EmploymentType employmentType;
        private String salary;
        private String insight;
        private boolean promoted;
        private boolean easyApply;
        private String description;
        private String responsibilities;
        private String tags;
        private LocalDateTime createdAt;
        private User employer;

        public JobBuilder id(Long id) { this.id = id; return this; }
        public JobBuilder title(String title) { this.title = title; return this; }
        public JobBuilder company(String company) { this.company = company; return this; }
        public JobBuilder location(String location) { this.location = location; return this; }
        public JobBuilder workplaceType(WorkplaceType wt) { this.workplaceType = wt; return this; }
        public JobBuilder employmentType(EmploymentType et) { this.employmentType = et; return this; }
        public JobBuilder salary(String salary) { this.salary = salary; return this; }
        public JobBuilder insight(String insight) { this.insight = insight; return this; }
        public JobBuilder promoted(boolean promoted) { this.promoted = promoted; return this; }
        public JobBuilder easyApply(boolean easyApply) { this.easyApply = easyApply; return this; }
        public JobBuilder description(String desc) { this.description = desc; return this; }
        public JobBuilder responsibilities(String resp) { this.responsibilities = resp; return this; }
        public JobBuilder tags(String tags) { this.tags = tags; return this; }
        public JobBuilder createdAt(LocalDateTime cat) { this.createdAt = cat; return this; }
        public JobBuilder employer(User employer) { this.employer = employer; return this; }

        public Job build() {
            return new Job(id, title, company, location, workplaceType, employmentType, salary,
                    insight, promoted, easyApply, description, responsibilities, tags, createdAt, employer);
        }
    }
}
