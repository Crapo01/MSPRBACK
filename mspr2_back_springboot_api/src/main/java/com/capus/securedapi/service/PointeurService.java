package com.capus.securedapi.service;

import com.capus.securedapi.dto.PointeurDto;

import java.util.List;

public interface PointeurService {
    PointeurDto createPointeur(PointeurDto pointeurDto);
    List<PointeurDto> getAllPointeurs();
    PointeurDto update(Long id, String nom,float lat,float lon,String type,String description,String lien);
    void deletePointeur(Long id);
}