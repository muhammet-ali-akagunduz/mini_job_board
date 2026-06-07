package com.minijobboard.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "recommendations")
public class Recommendation {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "target_user_id", nullable = false) 
    private User targetUser;
    
    private String authorName;
    private String authorTitle;
    
    @Column(columnDefinition = "TEXT") 
    private String content;

    public Recommendation() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getTargetUser() { return targetUser; }
    public void setTargetUser(User targetUser) { this.targetUser = targetUser; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public String getAuthorTitle() { return authorTitle; }
    public void setAuthorTitle(String authorTitle) { this.authorTitle = authorTitle; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
