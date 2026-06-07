package com.minijobboard.repository;

import com.minijobboard.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByCandidateIdOrderByAppliedAtDesc(Long candidateId);
    List<Application> findByJobEmployerIdOrderByAppliedAtDesc(Long employerId);
    Optional<Application> findByJobIdAndCandidateId(Long jobId, Long candidateId);
    long countByJobId(Long jobId);
    @org.springframework.data.jpa.repository.Query("SELECT a.job.id, COUNT(a.id) FROM Application a WHERE a.job.id IN :jobIds GROUP BY a.job.id")
    List<Object[]> countByJobIds(@org.springframework.data.repository.query.Param("jobIds") List<Long> jobIds);

    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.data.jpa.repository.Query("DELETE FROM Application a WHERE a.job.id = :jobId")
    void deleteByJobId(@org.springframework.data.repository.query.Param("jobId") Long jobId);
}
