package com.capus.securedapi.service;

import com.capus.securedapi.entity.Pointeur;
import com.capus.securedapi.exceptions.ApiException;

import java.util.List;

public interface PointeurService {
    Pointeur createPointeur(Pointeur pointeur);
    Pointeur deletePointeur(Long id) throws ApiException;

    List<Pointeur> getAllPointeurs();

    Pointeur update(Long id,Pointeur request) throws ApiException;
}
