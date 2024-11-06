package com.capus.securedapi.service.impl;

import com.capus.securedapi.dto.UserRoleUpdateDto;
import com.capus.securedapi.entity.ERole;
import com.capus.securedapi.entity.Role;
import com.capus.securedapi.entity.User;
import com.capus.securedapi.repository.UserRepository;
import com.capus.securedapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceIplm implements UserService {

    private UserRepository userRepository;
    public UserServiceIplm(UserRepository userRepository) {
        this.userRepository = userRepository;
    }



    @Override
    public List<UserRoleUpdateDto> getAllUsers() {
        return List.of();
    }

    @Override
    public UserRoleUpdateDto updateUser(Long id,Set<Role> roles) {
        User user = userRepository
                .findById(id)
                .orElseThrow(()->new RuntimeException(" No User found"));
        user.setRoles(roles);
        userRepository.save(user);

        UserRoleUpdateDto dummyToDelete = new UserRoleUpdateDto();
        return dummyToDelete;
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(()->new RuntimeException(" No User found"));
        userRepository.delete(user);
    }
}
