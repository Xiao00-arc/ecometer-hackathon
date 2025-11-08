package com.example.ecometer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "energy_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnergyData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
    
    @Column(name = "kwh_used", nullable = false, precision = 10, scale = 2)
    private BigDecimal kwhUsed;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "source_type", nullable = false)
    private SourceType sourceType;
    
    @Column(nullable = false)
    private LocalDateTime timestamp;
    
    @Column(name = "cost_usd", precision = 8, scale = 2)
    private BigDecimal costUsd;
    
    @Column(name = "carbon_kg", precision = 10, scale = 3)
    private BigDecimal carbonKg;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    public enum SourceType {
        ELECTRICITY, TRANSPORT, WASTE, HEATING, COOLING
    }
}