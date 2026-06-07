package com.minijobboard.dto;

import com.minijobboard.entity.WorkplaceType;
import com.minijobboard.entity.EmploymentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class JobCreateRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String company;

    @NotBlank
    private String location;

    @NotNull
    private WorkplaceType workplaceType;

    @NotNull
    private EmploymentType employmentType;

    private String salary;

    @NotBlank
    private String description;

    private String responsibilities;
    private String tags;

    public JobCreateRequest() {}

    public JobCreateRequest(String title, String company, String location, WorkplaceType workplaceType,
                            EmploymentType employmentType, String salary, String description,
                            String responsibilities, String tags) {
        this.title = title;
        this.company = company;
        this.location = location;
        this.workplaceType = workplaceType;
        this.employmentType = employmentType;
        this.salary = salary;
        this.description = description;
        this.responsibilities = responsibilities;
        this.tags = tags;
    }

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

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getResponsibilities() { return responsibilities; }
    public void setResponsibilities(String responsibilities) { this.responsibilities = responsibilities; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }
}
