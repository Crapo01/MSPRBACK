package com.capus.securedapi.service.impl;


import com.capus.securedapi.entity.Concert;
import com.capus.securedapi.entity.Pointeur;
import com.capus.securedapi.exceptions.ApiException;
import com.capus.securedapi.repository.PointeurRepository;
import com.capus.securedapi.service.PointeurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PointeurServiceIplm implements PointeurService {

    @Autowired
    private PointeurRepository pointeurRepository;


    @Override
    public Pointeur createPointeur(Pointeur pointeur) {
        return pointeurRepository.save(pointeur);
    }

    @Override
    public Pointeur deletePointeur(Long id) throws ApiException {
        Pointeur pointeurDeleted = pointeurRepository.findById(id).orElseThrow(() -> new ApiException("Id:" + id + " Not found in database", HttpStatus.NOT_FOUND));
        pointeurRepository.deleteById(id);
        return pointeurDeleted;
    }

    @Override
    public List<Pointeur> getAllPointeurs() {
        return pointeurRepository.findAll();
    }

    @Override
    public Pointeur update(Long id, Pointeur request) throws ApiException {
        Pointeur pointeur = pointeurRepository
                .findById(id)
                .orElseThrow(() -> new ApiException("Id:" + id + " Not found in database", HttpStatus.NOT_FOUND));
        pointeur.setId(id);
        pointeur.setNom(request.getNom());
        pointeur.setLat(request.getLat());
        pointeur.setLon(request.getLon());
        pointeur.setType(request.getType());
        pointeur.setDescription(request.getDescription());
        pointeur.setLien(request.getLien());
        return pointeurRepository.save(pointeur);

    }
}
