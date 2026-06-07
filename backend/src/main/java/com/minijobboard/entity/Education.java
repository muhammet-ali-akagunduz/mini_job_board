package com.minijobboard.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "educations")
public class Education {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "user_id", nullable = false) 
    private User user;
    
    private String school;
    private String degree;
    private String fieldOfStudy;
    private String startYear;
    private String endYear;
    private String grade;
    
    @Column(columnDefinition = "TEXT") 
    private String activities;

    public Education() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }
    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }
    public String getFieldOfStudy() { return fieldOfStudy; }
    public void setFieldOfStudy(String fieldOfStudy) { this.fieldOfStudy = fieldOfStudy; }
    public String getStartYear() { return startYear; }
    public void setStartYear(String startYear) { this.startYear = startYear; }
    public String getEndYear() { return endYear; }
    public void setEndYear(String endYear) { this.endYear = endYear; }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
    public String getActivities() { return activities; }
    public void setActivities(String activities) { this.activities = activities; }
}
