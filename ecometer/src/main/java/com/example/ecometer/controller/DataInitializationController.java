package com.example.ecometer.controller;

import com.example.ecometer.entity.Department;
import com.example.ecometer.entity.EnergyData;
import com.example.ecometer.entity.AiSuggestion;
import com.example.ecometer.repository.DepartmentRepository;
import com.example.ecometer.repository.EnergyDataRepository;
import com.example.ecometer.repository.AiSuggestionRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DataInitializationController {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EnergyDataRepository energyDataRepository;

    @Autowired
    private AiSuggestionRepository aiSuggestionRepository;

    @PostMapping("/initialize-test-data")
    public ResponseEntity<Map<String, Object>> initializeTestData() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Check if data already exists
            if (departmentRepository.count() > 0) {
                response.put("message", "Test data already exists. Use /reset-and-initialize to reload.");
                response.put("success", false);
                return ResponseEntity.ok(response);
            }

            loadTestDataFromJson();
            
            response.put("message", "Test data loaded successfully!");
            response.put("success", true);
            response.put("departments", departmentRepository.count());
            response.put("energyData", energyDataRepository.count());
            response.put("aiSuggestions", aiSuggestionRepository.count());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("message", "Error loading test data: " + e.getMessage());
            response.put("success", false);
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/reset-and-initialize")
    public ResponseEntity<Map<String, Object>> resetAndInitialize() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Clear existing data
            energyDataRepository.deleteAll();
            aiSuggestionRepository.deleteAll();
            departmentRepository.deleteAll();
            
            // Load fresh test data
            loadTestDataFromJson();
            
            response.put("message", "Database reset and test data loaded successfully!");
            response.put("success", true);
            response.put("departments", departmentRepository.count());
            response.put("energyData", energyDataRepository.count());
            response.put("aiSuggestions", aiSuggestionRepository.count());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("message", "Error resetting data: " + e.getMessage());
            response.put("success", false);
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/data-status")
    public ResponseEntity<Map<String, Object>> getDataStatus() {
        Map<String, Object> response = new HashMap<>();
        
        response.put("departments", departmentRepository.count());
        response.put("energyData", energyDataRepository.count());
        response.put("aiSuggestions", aiSuggestionRepository.count());
        response.put("hasData", departmentRepository.count() > 0);
        
        return ResponseEntity.ok(response);
    }

    private void loadTestDataFromJson() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        ClassPathResource resource = new ClassPathResource("test-data.json");
        JsonNode rootNode = mapper.readTree(resource.getInputStream());

        // Load Departments
        JsonNode departmentsNode = rootNode.get("departments");
        if (departmentsNode.isArray()) {
            for (JsonNode deptNode : departmentsNode) {
                Department dept = new Department();
                dept.setName(deptNode.get("name").asText());
                dept.setDescription(deptNode.get("description").asText());
                // Note: The current Department entity doesn't have location, totalDevices, averageConsumption fields
                // We'll only set the fields that exist
                departmentRepository.save(dept);
            }
        }

        // Load Energy Data
        JsonNode energyNode = rootNode.get("energyReadings");
        if (energyNode.isArray()) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            for (JsonNode energyReading : energyNode) {
                // Find department by name
                String departmentName = energyReading.get("department").asText();
                Department department = departmentRepository.findByName(departmentName).orElse(null);
                if (department != null) {
                    EnergyData energyData = new EnergyData();
                    energyData.setDepartment(department);
                    energyData.setTimestamp(LocalDateTime.parse(energyReading.get("timestamp").asText(), formatter));
                    energyData.setKwhUsed(BigDecimal.valueOf(energyReading.get("consumption").asDouble()));
                    energyData.setCostUsd(BigDecimal.valueOf(energyReading.get("cost").asDouble()));
                    energyData.setSourceType(EnergyData.SourceType.ELECTRICITY); // Default to electricity
                    energyDataRepository.save(energyData);
                }
            }
        }

        // Load AI Suggestions
        JsonNode aiNode = rootNode.get("aiSuggestions");
        if (aiNode.isArray()) {
            for (JsonNode suggestion : aiNode) {
                AiSuggestion aiSuggestion = new AiSuggestion();
                // Map title and description to suggestionText
                String suggestionText = suggestion.get("title").asText() + ": " + suggestion.get("description").asText();
                aiSuggestion.setSuggestionText(suggestionText);
                
                // Set category based on the type of suggestion
                aiSuggestion.setCategory(AiSuggestion.Category.ENERGY_SAVING);
                
                // Set priority - convert string to enum
                String priorityStr = suggestion.get("priority").asText();
                AiSuggestion.Priority priority;
                switch (priorityStr.toUpperCase()) {
                    case "HIGH":
                        priority = AiSuggestion.Priority.HIGH;
                        break;
                    case "LOW":
                        priority = AiSuggestion.Priority.LOW;
                        break;
                    default:
                        priority = AiSuggestion.Priority.MEDIUM;
                        break;
                }
                aiSuggestion.setPriority(priority);
                
                // Set estimated savings (convert percentage string to dollar amount)
                String savingsStr = suggestion.get("potentialSavings").asText().replace("%", "");
                try {
                    double savingsPercent = Double.parseDouble(savingsStr);
                    // Estimate dollar savings based on percentage (rough calculation)
                    aiSuggestion.setEstimatedSavingsUsd(BigDecimal.valueOf(savingsPercent * 10));
                } catch (NumberFormatException e) {
                    aiSuggestion.setEstimatedSavingsUsd(BigDecimal.valueOf(100.00));
                }
                
                aiSuggestionRepository.save(aiSuggestion);
            }
        }
    }
}