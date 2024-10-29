package com.capus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InformationDto {
    private Long id;
    private String message;
    private boolean important;
}
