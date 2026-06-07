package com.minijobboard.dto;

import java.util.List;

public class JobDTO {
    private Long id;
    private String title;
    private String company;
    private String location;
    private String workplaceType;
    private String employmentType;
    private String salary;
    private String insight;
    private boolean promoted;
    private boolean easyApply;
    private String description;
    private List<String> responsibilities;
    private List<String> tags;
    private String postedAgo;
    private int applicants;
    private boolean isSaved;
    private boolean isOwner;

    public JobDTO() {}

    public JobDTO(Long id, String title, String company, String location, String workplaceType,
                  String employmentType, String salary, String insight, boolean promoted,
                  boolean easyApply, String description, List<String> responsibilities,
                  List<String> tags, String postedAgo, int applicants, boolean isSaved, boolean isOwner) {
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
        this.postedAgo = postedAgo;
        this.applicants = applicants;
        this.isSaved = isSaved;
        this.isOwner = isOwner;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getWorkplaceType() { return workplaceType; }
    public void setWorkplaceType(String workplaceType) { this.workplaceType = workplaceType; }

    public String getEmploymentType() { return employmentType; }
    public void setEmploymentType(String employmentType) { this.employmentType = employmentType; }

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

    public List<String> getResponsibilities() { return responsibilities; }
    public void setResponsibilities(List<String> responsibilities) { this.responsibilities = responsibilities; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getPostedAgo() { return postedAgo; }
    public void setPostedAgo(String postedAgo) { this.postedAgo = postedAgo; }

    public int getApplicants() { return applicants; }
    public void setApplicants(int applicants) { this.applicants = applicants; }

    public boolean isSaved() { return isSaved; }
    public void setSaved(boolean isSaved) { this.isSaved = isSaved; }

    public boolean isOwner() { return isOwner; }
    public void setOwner(boolean isOwner) { this.isOwner = isOwner; }

    // Builder
    public static JobDTOBuilder builder() { return new JobDTOBuilder(); }

    public static class JobDTOBuilder {
        private Long id;
        private String title;
        private String company;
        private String location;
        private String workplaceType;
        private String employmentType;
        private String salary;
        private String insight;
        private boolean promoted;
        private boolean easyApply;
        private String description;
        private List<String> responsibilities;
        private List<String> tags;
        private String postedAgo;
        private int applicants;
        private boolean isSaved;
        private boolean isOwner;

        public JobDTOBuilder id(Long id) { this.id = id; return this; }
        public JobDTOBuilder title(String title) { this.title = title; return this; }
        public JobDTOBuilder company(String company) { this.company = company; return this; }
        public JobDTOBuilder location(String location) { this.location = location; return this; }
        public JobDTOBuilder workplaceType(String wt) { this.workplaceType = wt; return this; }
        public JobDTOBuilder employmentType(String et) { this.employmentType = et; return this; }
        public JobDTOBuilder salary(String salary) { this.salary = salary; return this; }
        public JobDTOBuilder insight(String insight) { this.insight = insight; return this; }
        public JobDTOBuilder promoted(boolean promoted) { this.promoted = promoted; return this; }
        public JobDTOBuilder easyApply(boolean easyApply) { this.easyApply = easyApply; return this; }
        public JobDTOBuilder description(String desc) { this.description = desc; return this; }
        public JobDTOBuilder responsibilities(List<String> resp) { this.responsibilities = resp; return this; }
        public JobDTOBuilder tags(List<String> tags) { this.tags = tags; return this; }
        public JobDTOBuilder postedAgo(String postedAgo) { this.postedAgo = postedAgo; return this; }
        public JobDTOBuilder applicants(int applicants) { this.applicants = applicants; return this; }
        public JobDTOBuilder isSaved(boolean isSaved) { this.isSaved = isSaved; return this; }
        public JobDTOBuilder isOwner(boolean isOwner) { this.isOwner = isOwner; return this; }

        public JobDTO build() {
            return new JobDTO(id, title, company, location, workplaceType, employmentType, salary,
                    insight, promoted, easyApply, description, responsibilities, tags, postedAgo, applicants, isSaved, isOwner);
        }
    }
}
