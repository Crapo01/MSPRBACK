package com.capus.mapper;

import com.capus.dto.PointeurDto;
import com.capus.entity.Pointeur;

public class PointeurMapper {
    public static Pointeur maptoPointeur(PointeurDto pointeurDto) {
        Pointeur pointeur = new Pointeur(pointeurDto.getId(), pointeurDto.getNom(), pointeurDto.getLon(), pointeurDto.getLat(), pointeurDto.getType(), pointeurDto.getDescription(), pointeurDto.getLien());
        return pointeur;
    }
    public static PointeurDto maptoPointeurDto(Pointeur pointeur) {
        PointeurDto pointeurDto = new PointeurDto(pointeur.getId(), pointeur.getNom(), pointeur.getLon(), pointeur.getLat(), pointeur.getType(), pointeur.getDescription(), pointeur.getLien());
        return pointeurDto;
    }
}