package com.capus.securedapi.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PointeurDto {
    @Schema(accessMode = Schema.AccessMode.READ_ONLY, description = "Marker Id", example = "1")
    private Long id;
    @Schema(description = "Name of the marker", example = "Entrance")
    private String nom;
    @Schema(description = "Longitude of the marker", example = "2.443")
    private float lon;
    @Schema(description = "Longitude of the marker", example = "48.8384")
    private float lat;
    @Schema(description = "Type of marker", type = "string", allowableValues = { "scene", "toilettes", "informations", "alimentation" })
    private String type;
    @Schema(description = "Description of the marker", example = "Here is a short description...")
    private String description;
    @Schema(description = "URL of web site", example = "https://www.ratp.fr/")
    private String lien;

}
