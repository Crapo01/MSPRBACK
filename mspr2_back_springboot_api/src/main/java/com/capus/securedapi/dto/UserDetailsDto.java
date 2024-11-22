package com.capus.securedapi.dto;


import com.capus.securedapi.entity.Role;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public class UserDetailsDto {
        private long id;
        private String username;
        private String email;
        private Set<Role> roles = new HashSet<>();

    }

