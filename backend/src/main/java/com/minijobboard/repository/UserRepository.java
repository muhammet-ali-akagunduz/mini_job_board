package com.minijobboard.repository;

import com.minijobboard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.data.jpa.repository.Query(value = "DELETE FROM user_saved_jobs WHERE job_id = :jobId", nativeQuery = true)
    void removeSavedJobReferences(@org.springframework.data.repository.query.Param("jobId") Long jobId);
}
