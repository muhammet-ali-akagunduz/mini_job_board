package com.minijobboard.repository;

import com.minijobboard.entity.Job;
import com.minijobboard.entity.WorkplaceType;
import com.minijobboard.entity.EmploymentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByEmployerId(Long employerId);

    @Query("SELECT j FROM Job j WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           " LOWER(j.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           " LOWER(j.company) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           " LOWER(j.tags) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND (:location IS NULL OR :location = '' OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) " +
           "AND (:workplaceType IS NULL OR j.workplaceType = :workplaceType) " +
           "AND (:employmentType IS NULL OR j.employmentType = :employmentType) " +
           "ORDER BY j.createdAt DESC")
    List<Job> searchJobs(
        @Param("search") String search,
        @Param("location") String location,
        @Param("workplaceType") WorkplaceType workplaceType,
        @Param("employmentType") EmploymentType employmentType
    );
}
