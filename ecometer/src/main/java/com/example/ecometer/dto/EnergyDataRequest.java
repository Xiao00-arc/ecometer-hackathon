package com.example.ecometer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnergyDataRequest {
    private Long departmentId;
    private BigDecimal kwhUsed;
    private String sourceType; // Will be converted to enum
    private BigDecimal costUsd;
    private BigDecimal carbonKg;
}