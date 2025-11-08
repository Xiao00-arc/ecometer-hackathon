package com.example.ecometer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_suggestions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiSuggestion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "suggestion_text", nullable = false, columnDefinition = "TEXT")
    private String suggestionText;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority = Priority.MEDIUM;
    
    @Column(name = "estimated_savings_usd", precision = 8, scale = 2)
    private BigDecimal estimatedSavingsUsd;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum Category {
        ENERGY_SAVING, COST_REDUCTION, SUSTAINABILITY, MAINTENANCE
    }
    
    public enum Priority {
        LOW, MEDIUM, HIGH
    }
}