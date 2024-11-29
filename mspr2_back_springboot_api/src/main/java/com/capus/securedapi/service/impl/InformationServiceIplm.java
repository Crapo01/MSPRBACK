package com.capus.securedapi.service.impl;

import com.capus.securedapi.dto.InformationDto;
import com.capus.securedapi.entity.Information;
import com.capus.securedapi.exceptions.ApiException;
import com.capus.securedapi.mapper.InformationMapper;
import com.capus.securedapi.repository.InformationRepository;
import com.capus.securedapi.service.InformationService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InformationServiceIplm implements InformationService {

    private InformationRepository infosRepository;

    @Override
    public Information createInformation(Information information) {
        return infosRepository.save(information);
    }

    @Override
    public Information deleteInformation(Long id) throws ApiException {
        Information informationDeleted = infosRepository.findById(id).orElseThrow(() -> new ApiException("Id:" + id + " Not found in database", HttpStatus.NOT_FOUND));
        infosRepository.deleteById(id);
        return informationDeleted;
    }

    @Override
    public List<Information> getAllInformation() {
        return infosRepository.findAll();
    }

    @Override
    public Information update(Long id, Information request) throws ApiException {
        Information information = infosRepository
                .findById(id)
                //          .orElseThrow(()->new ResourceNotFoundException("Id:"+id+" Not found in database"));
                .orElseThrow(() -> new ApiException("Id:" + id + " Not found in database", HttpStatus.NOT_FOUND));

        information.setId(id);
        information.setMessage(request.getMessage());
        information.setImportant(request.isImportant());
        return infosRepository.save(information);
    }
}
