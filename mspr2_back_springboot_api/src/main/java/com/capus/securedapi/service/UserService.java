package com.capus.securedapi.service;

import com.capus.securedapi.dto.PointeurDto;
import com.capus.securedapi.dto.UserRoleUpdateDto;
import com.capus.securedapi.entity.Role;


import java.util.List;
import java.util.Set;


public interface UserService {
    //User createUser(User user);
    List<UserRoleUpdateDto> getAllUsers();
    UserRoleUpdateDto updateUser(Long id, Set<Role> roles);
    void deleteUser(Long id);
}
