package com.example.ecometer.dto;

import com.example.ecometer.entity.EnergyData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnergyDataResponse {
    private Long id;
    private BigDecimal kwhUsed;
    private String sourceType;
    private LocalDateTime timestamp;
    private BigDecimal costUsd;
    private BigDecimal carbonKg;
    private LocalDateTime createdAt;
    
    // Department info (without circular reference)
    private Long departmentId;
    private String departmentName;
    
    // Constructor to convert from EnergyData entity
    public EnergyDataResponse(EnergyData energyData) {
        this.id = energyData.getId();
        this.kwhUsed = energyData.getKwhUsed();
        this.sourceType = energyData.getSourceType().toString();
        this.timestamp = energyData.getTimestamp();
        this.costUsd = energyData.getCostUsd();
        this.carbonKg = energyData.getCarbonKg();
        this.createdAt = energyData.getCreatedAt();
        
        if (energyData.getDepartment() != null) {
            this.departmentId = energyData.getDepartment().getId();
            this.departmentName = energyData.getDepartment().getName();
        }
    }
}