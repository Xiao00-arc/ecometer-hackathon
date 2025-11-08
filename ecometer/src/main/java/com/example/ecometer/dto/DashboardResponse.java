package com.example.ecometer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private BigDecimal totalCarbonFootprint;
    private BigDecimal totalCostUsd;
    private BigDecimal totalKwhUsed;
    private List<DepartmentSummary> departmentSummaries;
    private List<SuggestionResponse> aiSuggestions;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DepartmentSummary {
        private String departmentName;
        private BigDecimal totalKwh;
        private BigDecimal totalCarbonKg;
        private BigDecimal totalCostUsd;
        private Integer readingCount;
    }
}