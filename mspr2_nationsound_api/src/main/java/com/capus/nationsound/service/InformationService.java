package com.capus.nationsound.service;

import com.capus.nationsound.dto.InformationDto;

import java.util.List;

public interface InformationService {

    InformationDto createInformation(InformationDto informationDto);
    List<InformationDto> getAllInformation();
    InformationDto update(Long id, String message,boolean important);
    void deleteInformation(Long id);
}
