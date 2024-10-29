package com.capus.mapper;

import com.capus.dto.InformationDto;
import com.capus.entity.Information;

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
