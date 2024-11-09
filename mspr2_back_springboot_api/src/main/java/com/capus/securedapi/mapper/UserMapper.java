package com.capus.securedapi.mapper;


import com.capus.securedapi.dto.UserDetailsDto;
import com.capus.securedapi.dto.UserRoleUpdateDto;
import com.capus.securedapi.entity.User;

public class UserMapper {
    public static UserRoleUpdateDto maptoUserRoleUpdateDto(User user) {
        // A VOIR: ce mappeur ne fonctionne pas comme ça (retourne un Dto sans les valeurs recuperees par le getter
        // UserRoleUpdateDto mappedDto = new UserRoleUpdateDto(user.getId(), user.getUsername(), user.getRoles());

        // fonctionne bien comme ça
        UserRoleUpdateDto mappedDto = new UserRoleUpdateDto();
        mappedDto.setId(user.getId());
        return mappedDto;
    }

    public static UserDetailsDto maptoUserDetailsDto(User user) {

        //UserDetailsDto mappedDto = new UserDetailsDto(user.getId(), user.getUsername(), user.getRoles());

        // fonctionne bien comme ça
        UserDetailsDto mappedDto = new UserDetailsDto();
        mappedDto.setId(user.getId());
        mappedDto.setUsername(user.getUsername());
        mappedDto.setRoles(user.getRoles());

        return mappedDto;
    }
}
