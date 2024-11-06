package com.capus.securedapi.service;

import com.capus.securedapi.dto.InformationDto;

import java.util.List;

public interface InformationService {

    InformationDto createInformation(InformationDto informationDto);
    List<InformationDto> getAllInformation();
    InformationDto update(Long id, String message,boolean important);
    void deleteInformation(Long id);
}