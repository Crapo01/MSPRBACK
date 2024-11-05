package com.capus.securedapi.service.impl;

import com.capus.securedapi.dto.InformationDto;
import com.capus.securedapi.entity.Information;
import com.capus.securedapi.mapper.InformationMapper;
import com.capus.securedapi.repository.InformationRepository;
import com.capus.securedapi.service.InformationService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InformationServiceIplm implements InformationService {

    private InformationRepository informationRepository;

    public InformationServiceIplm(InformationRepository informationRepository) {
        this.informationRepository = informationRepository;
    }

    @Override
    public InformationDto createInformation(InformationDto informationDto) {
        Information information = InformationMapper.mapToInformation(informationDto);
        Information savedInformation = informationRepository.save(information);
        return InformationMapper.mapToInformationDto(savedInformation);
    }

    @Override
    public List<InformationDto> getAllInformation() {
        List<Information> informations = informationRepository.findAll();
        return informations.stream().map(InformationMapper::mapToInformationDto).collect(Collectors.toList());
    }

    @Override
    public InformationDto update(Long id, String message, boolean important) {
        Information information = informationRepository
                .findById(id)
                .orElseThrow(()->new RuntimeException(id+" No info found"));
        information.setId(id);
        information.setMessage(message);
        information.setImportant(important);
        Information savedInformation = informationRepository.save(information);
        return InformationMapper.mapToInformationDto(savedInformation);
    }

    @Override
    public void deleteInformation(Long id) {
        Information information =informationRepository
                .findById(id)
                .orElseThrow(()->new RuntimeException("No information found"));
        informationRepository.deleteById(id);

    }
}
