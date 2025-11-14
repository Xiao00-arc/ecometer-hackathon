package com.example.ecometer.repository;

import com.example.ecometer.entity.AiSuggestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AiSuggestionRepository extends JpaRepository<AiSuggestion, Long> {
    
    List<AiSuggestion> findByIsActiveTrue();
    
    @Query(value = "SELECT * FROM ai_suggestions WHERE is_active = true ORDER BY RAND() LIMIT 2", nativeQuery = true)
    List<AiSuggestion> findRandomActiveSuggestions();
    
    List<AiSuggestion> findByPriorityAndIsActiveTrue(AiSuggestion.Priority priority);
}