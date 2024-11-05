package com.capus.securedapi.service.impl;

import org.springframework.stereotype.Service;

import com.capus.securedapi.dto.ConcertDto;
import com.capus.securedapi.entity.Concert;
import com.capus.securedapi.mapper.ConcertMapper;
import com.capus.securedapi.repository.ConcertRepository;
import com.capus.securedapi.service.ConcertService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConcertServiceIplm implements ConcertService{
	
	private ConcertRepository concertRepository;

	
	public ConcertServiceIplm(ConcertRepository concertRepository) {
		this.concertRepository = concertRepository;
	}

	@Override
	public ConcertDto createConcert(ConcertDto concertDto) {
		Concert concert = ConcertMapper.mapToConcert(concertDto);
		Concert savedConcert = concertRepository.save(concert);
		return ConcertMapper.mapToConcertDto(savedConcert);
	}

	@Override
	public ConcertDto getConcertById(Long id) {
		Concert concert = concertRepository
				.findById(id)
				.orElseThrow(()->new RuntimeException(id+" No concert found"));
		return ConcertMapper.mapToConcertDto(concert);
	}

	@Override
	public ConcertDto update(Long id, String Nom, String Image,String Description,String Origine,String Date,String Heure,String Scene,String lien){
		Concert concert = concertRepository
				.findById(id)
				.orElseThrow(()->new RuntimeException(id+" No concert found"));
		concert.setId(id);
		concert.setNom(Nom);
		concert.setImage(Image);
		concert.setDescription(Description);
		concert.setOrigine(Origine);
		concert.setDate(Date);
		concert.setHeure(Heure);
		concert.setScene(Scene);
		concert.setLien(lien);

		Concert savedConcert = concertRepository.save(concert);
		return ConcertMapper.mapToConcertDto(savedConcert);
	}



	@Override
	public List<ConcertDto> getAllConcerts() {
		List<Concert> concerts = concertRepository.findAll();
		return concerts.stream().map(ConcertMapper::mapToConcertDto).collect(Collectors.toList());
	}

	@Override
	public void deleteConcert(Long id) {
		Concert concert = concertRepository
				.findById(id)
				.orElseThrow(()->new RuntimeException(" No concert found"));
		concertRepository.deleteById(id);
	}


}
