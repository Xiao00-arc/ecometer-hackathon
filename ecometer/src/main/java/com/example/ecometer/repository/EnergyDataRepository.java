package com.example.ecometer.repository;

import com.example.ecometer.entity.EnergyData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EnergyDataRepository extends JpaRepository<EnergyData, Long> {
    
    List<EnergyData> findByTimestampAfter(LocalDateTime timestamp);
    
    List<EnergyData> findByDepartmentIdAndTimestampAfter(Long departmentId, LocalDateTime timestamp);
    
    @Query("SELECT ed FROM EnergyData ed WHERE ed.timestamp >= :startTime ORDER BY ed.timestamp DESC")
    List<EnergyData> findRecentEnergyData(LocalDateTime startTime);
    
    @Query("SELECT d.name, SUM(ed.kwhUsed), SUM(ed.carbonKg), SUM(ed.costUsd) " +
           "FROM EnergyData ed JOIN ed.department d " +
           "WHERE ed.timestamp >= :startTime " +
           "GROUP BY d.id, d.name")
    List<Object[]> getDepartmentSummary(LocalDateTime startTime);
    
    List<EnergyData> findTop10ByOrderByCreatedAtDesc();
}