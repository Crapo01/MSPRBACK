package com.capus.securedapi.service;

import com.capus.securedapi.dto.UserDetailsDto;
import com.capus.securedapi.dto.UserRoleUpdateDto;
import com.capus.securedapi.entity.Role;
import com.capus.securedapi.entity.User;


import java.util.List;
import java.util.Set;


public interface UserService {
    //User createUser(User user);
    List<UserDetailsDto> getAllUsers();
    UserRoleUpdateDto updateUser(Long id, Set<Role> roles);
    void deleteUser(Long id);
}
