package com.capus.securedapi.dto;

import com.capus.securedapi.entity.Role;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleUpdateDto {
    private long id;
    private String username;
    private Set<String> role = new HashSet<>();
    private Set<Role> roles = new HashSet<>();

    public UserRoleUpdateDto(Long id, String username, Set<Role> roles) {
    }
}
