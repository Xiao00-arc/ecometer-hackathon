package com.example.ecometer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuggestionResponse {
    private Long id;
    private String suggestionText;
    private String category;
    private String priority;
    private BigDecimal estimatedSavingsUsd;
}