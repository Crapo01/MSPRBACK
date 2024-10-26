package com.capus.service.impl;

import org.springframework.stereotype.Service;

import com.capus.dto.ConcertDto;
import com.capus.entity.Concert;
import com.capus.mapper.ConcertMapper;
import com.capus.repository.ConcertRepository;
import com.capus.service.ConcertService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConcertServiceIpml implements ConcertService{
	
	private ConcertRepository concertRepository;

	
	public ConcertServiceIpml(ConcertRepository concertRepository) {
		this.concertRepository = concertRepository;
	}

	@Override
	public ConcertDto createConcert(ConcertDto concertDto) {
		Concert concert = ConcertMapper.mapToConcert(concertDto);
		Concert savedAccount = concertRepository.save(concert);
		return ConcertMapper.mapToConcertDto(savedAccount);
	}

	@Override
	public ConcertDto getConcertById(Long id) {
		Concert concert = concertRepository
				.findById(id)
				.orElseThrow(()->new RuntimeException(id+" No concert found"));
		return ConcertMapper.mapToConcertDto(concert);
	}

	@Override
	public ConcertDto update(Long id, String Nom, String Image,String Description,String Origine,String Date,String Heure,String Scene){
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

		Concert savedAccount = concertRepository.save(concert);
		return ConcertMapper.mapToConcertDto(savedAccount);
	}



	@Override
	public List<ConcertDto> getAllConcerts() {
		List<Concert> accounts = concertRepository.findAll();
		return accounts.stream().map(ConcertMapper::mapToConcertDto).collect(Collectors.toList());
	}

	@Override
	public void deleteConcert(Long id) {
		Concert concert = concertRepository
				.findById(id)
				.orElseThrow(()->new RuntimeException(" No account found"));
		concertRepository.deleteById(id);
	}


}
