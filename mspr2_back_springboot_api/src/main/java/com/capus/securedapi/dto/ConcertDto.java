package com.capus.securedapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConcertDto {
    @Schema(accessMode = Schema.AccessMode.READ_ONLY, description = "User Id", example = "1")
	private Long id;
    @Schema(description = "Name of the band or artist", example = "The artist")
	private String nom;
    @Schema(description = "URL of image", example = "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg")
    private String image;
    @Schema(description = "Name of the band or artist", example = "Here is a short description...")
    private String description;
    @Schema(description = "Origin of the band or artist", type = "string", allowableValues = { "Europe", "Amerique", "Afrique", "Asie", "Australie" })
    private String origine;
    @Schema(description = "Date of the performance", example = "14 Juin")
    private String date;
    @Schema(description = "Time of the performance", example = "20:00")
    private String heure;
    @Schema(description = "Scene for the performance", example = "nord")
    private String scene;
    @Schema(description = "URL of web site", example = "https://images.pexels.com")
    private String lien;
}
