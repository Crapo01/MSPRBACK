package com.capus.securedapi.dto;


import com.capus.securedapi.entity.Role;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

    @Getter
    @Setter
    public class UserDetailsDto {
        private long id;
        private String username;
        private Set<Role> roles = new HashSet<>();

        public UserDetailsDto(Long id, String username, Set<Role> roles) {
        }


        public UserDetailsDto() {

        }
    }

