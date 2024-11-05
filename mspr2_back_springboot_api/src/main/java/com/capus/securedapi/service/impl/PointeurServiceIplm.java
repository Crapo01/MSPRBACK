package com.capus.securedapi.service.impl;

import com.capus.securedapi.dto.PointeurDto;
import com.capus.securedapi.entity.Pointeur;
import com.capus.securedapi.mapper.PointeurMapper;
import com.capus.securedapi.repository.PointeurRepositary;
import com.capus.securedapi.service.PointeurService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PointeurServiceIplm implements PointeurService {

    private PointeurRepositary pointeurRepositary;

    public PointeurServiceIplm(PointeurRepositary pointeurRepositary) {
        this.pointeurRepositary = pointeurRepositary;
    }


    @Override
    public PointeurDto createPointeur(PointeurDto pointeurDto) {
        Pointeur pointeur = PointeurMapper.maptoPointeur(pointeurDto);
        Pointeur savedPointeur = pointeurRepositary.save(pointeur);
        return PointeurMapper.maptoPointeurDto(savedPointeur);
    }

    @Override
    public List<PointeurDto> getAllPointeurs() {
        List<Pointeur> pointeurs = pointeurRepositary.findAll();
        return pointeurs.stream().map(PointeurMapper::maptoPointeurDto).collect(Collectors.toList());
    }

    @Override
    public PointeurDto update(Long id, String nom, float lat, float lon, String type, String description, String lien) {
        Pointeur pointeur = pointeurRepositary
                .findById(id)
                .orElseThrow(()->new RuntimeException(id+" No info found"));
        pointeur.setId(id);
        pointeur.setNom(nom);
        pointeur.setLat(lat);
        pointeur.setLon(lon);
        pointeur.setType(type);
        pointeur.setDescription(description);
        pointeur.setLien(lien);
        Pointeur savedPointeur = pointeurRepositary.save(pointeur);
        return PointeurMapper.maptoPointeurDto(savedPointeur);
    }

    @Override
    public void deletePointeur(Long id) {
        Pointeur pointeur = pointeurRepositary.findById(id).orElseThrow(() -> new RuntimeException("No pointeur found"));
        pointeurRepositary.deleteById(id);
    }
}
