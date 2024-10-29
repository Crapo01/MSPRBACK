package com.capus.service;

import com.capus.dto.ConcertDto;

import java.util.List;

public interface ConcertService {
	ConcertDto createConcert(ConcertDto concertDto);

	ConcertDto getConcertById(Long id);

	ConcertDto update(Long id, String Nom, String Image,String Description,String Origine,String Date,String Heure,String Scene,String lien);

	List<ConcertDto> getAllConcerts();

	void deleteConcert(Long id);
}
