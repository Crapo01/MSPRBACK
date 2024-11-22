package com.capus.securedapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InformationDto {
    @Schema(accessMode = Schema.AccessMode.READ_ONLY, description = "Info Id", example = "1")
    private Long id;
    @Schema(description = "Message to be sent", example = "This message is for example only.")
    private String message;
    @Schema(description = "Importance")
    private boolean important;
}
