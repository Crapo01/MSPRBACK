package com.capus.securedapi.service.impl;

import com.capus.securedapi.entity.Information;
import com.capus.securedapi.exceptions.ApiException;
import com.capus.securedapi.repository.InformationRepository;
import com.capus.securedapi.service.InformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InformationServiceIplm implements InformationService {

    @Autowired
    private InformationRepository infosRepository;

    @Override
    public Information createInformation(Information information) {
        return infosRepository.save(information);
    }

    @Override
    public Information deleteInformation(Long id) throws ApiException {
        Information informationDeleted = infosRepository.findById(id)
                .orElseThrow(() -> new ApiException("Id:" + id + " Not found in database", HttpStatus.NOT_FOUND));
        infosRepository.deleteById(id);
        return informationDeleted;
    }

    @Override
    public List<Information> getAllInformation() {
        return infosRepository.findAll();
    }

    @Override
    public Information update(Long id, Information request) throws ApiException {
        Optional<Information> optionalInfo = infosRepository.findById(id);

        // Vérifier si l'utilisateur existe
        if (!optionalInfo.isPresent()) {
            throw new ApiException("Info not found with id: " + id);
        }


        Information information = optionalInfo.get();
        information.setId(id);
        information.setMessage(request.getMessage());
        information.setImportant(request.isImportant());
        return infosRepository.save(information);


    }
}
