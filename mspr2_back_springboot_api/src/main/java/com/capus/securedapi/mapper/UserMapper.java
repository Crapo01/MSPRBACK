package com.capus.securedapi.mapper;


import com.capus.securedapi.dto.UserDetailsDto;
import com.capus.securedapi.dto.UserRoleUpdateDto;
import com.capus.securedapi.entity.User;

public class UserMapper {


    public static UserDetailsDto maptoUserDetailsDto(User user) {

        UserDetailsDto mappedDto = new UserDetailsDto(user.getId(), user.getUsername(), user.getRoles());

        // fonctionne bien comme ça
//        UserDetailsDto mappedDto = new UserDetailsDto();
//        mappedDto.setId(user.getId());
//        mappedDto.setUsername(user.getUsername());
//        mappedDto.setRoles(user.getRoles());

        return mappedDto;
    }
}
