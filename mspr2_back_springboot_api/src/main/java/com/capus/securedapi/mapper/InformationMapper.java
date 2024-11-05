package com.capus.securedapi.mapper;

import com.capus.securedapi.dto.InformationDto;
import com.capus.securedapi.entity.Information;

public class InformationMapper {

    public static Information mapToInformation(InformationDto informationDto) {
        Information information = new Information(informationDto.getId(),informationDto.getMessage(),informationDto.isImportant());
        return information;
    }

    public static InformationDto mapToInformationDto(Information information) {
        InformationDto informationDto = new InformationDto(information.getId(),information.getMessage(),information.isImportant());
        return informationDto;
    }
}
