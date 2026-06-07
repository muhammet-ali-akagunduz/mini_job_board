package com.minijobboard.dto;

public class ApplicationDTO {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private String company;
    private String candidateName;
    private String candidateEmail;
    private Long candidateId;
    private String status;
    private String appliedAt;

    public ApplicationDTO() {}

    public ApplicationDTO(Long id, Long jobId, String jobTitle, String company, String candidateName,
                          String candidateEmail, Long candidateId, String status, String appliedAt) {
        this.id = id;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.company = company;
        this.candidateName = candidateName;
        this.candidateEmail = candidateEmail;
        this.candidateId = candidateId;
        this.status = status;
        this.appliedAt = appliedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getCandidateName() { return candidateName; }
    public void setCandidateName(String candidateName) { this.candidateName = candidateName; }

    public String getCandidateEmail() { return candidateEmail; }
    public void setCandidateEmail(String candidateEmail) { this.candidateEmail = candidateEmail; }

    public Long getCandidateId() { return candidateId; }
    public void setCandidateId(Long candidateId) { this.candidateId = candidateId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAppliedAt() { return appliedAt; }
    public void setAppliedAt(String appliedAt) { this.appliedAt = appliedAt; }

    // Builder
    public static ApplicationDTOBuilder builder() { return new ApplicationDTOBuilder(); }

    public static class ApplicationDTOBuilder {
        private Long id;
        private Long jobId;
        private String jobTitle;
        private String company;
        private String candidateName;
        private String candidateEmail;
        private Long candidateId;
        private String status;
        private String appliedAt;

        public ApplicationDTOBuilder id(Long id) { this.id = id; return this; }
        public ApplicationDTOBuilder jobId(Long jobId) { this.jobId = jobId; return this; }
        public ApplicationDTOBuilder jobTitle(String jobTitle) { this.jobTitle = jobTitle; return this; }
        public ApplicationDTOBuilder company(String company) { this.company = company; return this; }
        public ApplicationDTOBuilder candidateName(String name) { this.candidateName = name; return this; }
        public ApplicationDTOBuilder candidateEmail(String email) { this.candidateEmail = email; return this; }
        public ApplicationDTOBuilder candidateId(Long candidateId) { this.candidateId = candidateId; return this; }
        public ApplicationDTOBuilder status(String status) { this.status = status; return this; }
        public ApplicationDTOBuilder appliedAt(String appliedAt) { this.appliedAt = appliedAt; return this; }

        public ApplicationDTO build() {
            return new ApplicationDTO(id, jobId, jobTitle, company, candidateName, candidateEmail, candidateId, status, appliedAt);
        }
    }
}
