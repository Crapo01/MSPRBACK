package com.capus.securedapi.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PointeurDto {
    private Long id;
    private String nom;
    private float lon;
    private float lat;
    private String type;
    private String description;
    private String lien;
}
