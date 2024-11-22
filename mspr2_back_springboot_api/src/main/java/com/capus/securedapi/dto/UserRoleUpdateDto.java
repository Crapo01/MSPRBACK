package com.capus.securedapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "data for user role update")
public class UserRoleUpdateDto {
    @Schema(accessMode = Schema.AccessMode.READ_ONLY, description = "User Id", example = "1")
    private long id;
    @Schema(description = "Set of roles to update", allowableValues = {"viewer","admin","editor","none" } ,example = "[\"viewer\",\"admin\",\"editor\",\"none\"]")
    private Set<String> role = new HashSet<>();

    }


