package com.example.ecometer.controller;

import com.example.ecometer.dto.DashboardResponse;
import com.example.ecometer.dto.EnergyDataRequest;
import com.example.ecometer.dto.SuggestionResponse;
import com.example.ecometer.entity.AiSuggestion;
import com.example.ecometer.entity.Department;
import com.example.ecometer.entity.EnergyData;
import com.example.ecometer.repository.AiSuggestionRepository;
import com.example.ecometer.repository.DepartmentRepository;
import com.example.ecometer.repository.EnergyDataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000") // Allow React app to call our API
public class EcoMeterController {
    
    private final EnergyDataRepository energyDataRepository;
    private final DepartmentRepository departmentRepository;
    private final AiSuggestionRepository aiSuggestionRepository;
    
    /**
     * POST /api/data - Simulate IoT sensor sending data
     * Accepts energy consumption data and saves it to database
     */
    @PostMapping("/data")
    public ResponseEntity<String> receiveEnergyData(@RequestBody EnergyDataRequest request) {
        try {
            log.info("Received energy data: {}", request);
            
            // Find department
            Department department = departmentRepository.findById(request.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found with id: " + request.getDepartmentId()));
            
            // Create new energy data entry
            EnergyData energyData = new EnergyData();
            energyData.setDepartment(department);
            energyData.setKwhUsed(request.getKwhUsed());
            energyData.setSourceType(EnergyData.SourceType.valueOf(request.getSourceType().toUpperCase()));
            energyData.setTimestamp(LocalDateTime.now());
            energyData.setCostUsd(request.getCostUsd());
            energyData.setCarbonKg(request.getCarbonKg());
            
            // Calculate carbon footprint if not provided (simple estimation)
            if (energyData.getCarbonKg() == null) {
                // Average carbon intensity: 0.45 kg CO2 per kWh
                energyData.setCarbonKg(request.getKwhUsed().multiply(new BigDecimal("0.45")));
            }
            
            // Calculate cost if not provided (simple estimation)
            if (energyData.getCostUsd() == null) {
                // Average cost: $0.12 per kWh
                energyData.setCostUsd(request.getKwhUsed().multiply(new BigDecimal("0.12")));
            }
            
            energyDataRepository.save(energyData);
            
            return ResponseEntity.ok("Energy data saved successfully");
            
        } catch (Exception e) {
            log.error("Error saving energy data: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving energy data: " + e.getMessage());
        }
    }
    
    /**
     * GET /api/dashboard-data - Fetch dashboard data
     * Returns aggregated data for the dashboard including totals and department breakdowns
     */
    @GetMapping("/dashboard-data")
    public ResponseEntity<DashboardResponse> getDashboardData() {
        try {
            log.info("Fetching dashboard data");
            
            // Get data from last 24 hours
            LocalDateTime last24Hours = LocalDateTime.now().minusHours(24);
            List<EnergyData> recentData = energyDataRepository.findRecentEnergyData(last24Hours);
            
            // Calculate totals
            BigDecimal totalCarbonFootprint = recentData.stream()
                    .map(EnergyData::getCarbonKg)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            BigDecimal totalCostUsd = recentData.stream()
                    .map(EnergyData::getCostUsd)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            BigDecimal totalKwhUsed = recentData.stream()
                    .map(EnergyData::getKwhUsed)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            // Get department summaries
            List<Object[]> departmentSummaryData = energyDataRepository.getDepartmentSummary(last24Hours);
            List<DashboardResponse.DepartmentSummary> departmentSummaries = departmentSummaryData.stream()
                    .map(row -> new DashboardResponse.DepartmentSummary(
                            (String) row[0], // department name
                            (BigDecimal) row[1], // total kwh
                            (BigDecimal) row[2], // total carbon kg
                            (BigDecimal) row[3], // total cost usd
                            recentData.size() // reading count (simplified)
                    ))
                    .collect(Collectors.toList());
            
            // Get AI suggestions (2 random ones)
            List<AiSuggestion> suggestions = aiSuggestionRepository.findRandomActiveSuggestions();
            List<SuggestionResponse> aiSuggestions = suggestions.stream()
                    .map(this::convertToSuggestionResponse)
                    .collect(Collectors.toList());
            
            DashboardResponse response = new DashboardResponse(
                    totalCarbonFootprint,
                    totalCostUsd,
                    totalKwhUsed,
                    departmentSummaries,
                    aiSuggestions
            );
            
            log.info("Dashboard data fetched successfully");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error fetching dashboard data: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * GET /api/suggestions - Get AI suggestions
     * Returns AI-generated suggestions for energy savings
     */
    @GetMapping("/suggestions")
    public ResponseEntity<List<SuggestionResponse>> getAiSuggestions() {
        try {
            log.info("Fetching AI suggestions");
            
            List<AiSuggestion> suggestions = aiSuggestionRepository.findRandomActiveSuggestions();
            List<SuggestionResponse> response = suggestions.stream()
                    .map(this::convertToSuggestionResponse)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error fetching AI suggestions: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Helper method to convert AiSuggestion entity to response DTO
     */
    private SuggestionResponse convertToSuggestionResponse(AiSuggestion suggestion) {
        return new SuggestionResponse(
                suggestion.getId(),
                suggestion.getSuggestionText(),
                suggestion.getCategory().toString(),
                suggestion.getPriority().toString(),
                suggestion.getEstimatedSavingsUsd()
        );
    }
    
    /**
     * GET /api/departments - Get all departments (helper endpoint)
     */
    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getAllDepartments() {
        try {
            List<Department> departments = departmentRepository.findAll();
            return ResponseEntity.ok(departments);
        } catch (Exception e) {
            log.error("Error fetching departments: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}