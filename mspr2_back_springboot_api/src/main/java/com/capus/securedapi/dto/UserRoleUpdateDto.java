package com.capus.securedapi.dto;

import com.capus.securedapi.entity.Role;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRoleUpdateDto {
    private long id;
    private Set<String> role = new HashSet<>();
    //a voir
    }


