package com.capus.securedapi.service.impl;

import com.capus.securedapi.dto.UserRoleUpdateDto;
import com.capus.securedapi.entity.Role;
import com.capus.securedapi.entity.User;
import com.capus.securedapi.mapper.InformationMapper;
import com.capus.securedapi.mapper.UserMapper;
import com.capus.securedapi.repository.UserRepository;
import com.capus.securedapi.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceIplm implements UserService {

    private UserRepository userRepository;
    public UserServiceIplm(UserRepository userRepository) {
        this.userRepository = userRepository;
    }



    @Override
    public List<UserRoleUpdateDto> getAllUsers() {
        List<User> users = userRepository.findAll();


        return users.stream().map(UserMapper::maptoUserRoleUpdateDto).collect(Collectors.toList());
    }

    @Override
    public UserRoleUpdateDto updateUser(Long id,Set<Role> roles) {
        User user = userRepository
                .findById(id)
                .orElseThrow(()->new RuntimeException(" No User found"));
        user.setRoles(roles);
        userRepository.save(user);

        UserRoleUpdateDto updatedDto = UserMapper.maptoUserRoleUpdateDto(user);

        return updatedDto;
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(()->new RuntimeException(" No User found"));
        userRepository.delete(user);
    }
}
