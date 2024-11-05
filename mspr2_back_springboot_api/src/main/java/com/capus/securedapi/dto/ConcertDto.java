package com.capus.securedapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConcertDto {
	private Long id;
	
	private String nom;
    private String image;
    private String description;
    private String origine;
    private String date;
    private String heure;
    private String scene;
    private String lien;
}
