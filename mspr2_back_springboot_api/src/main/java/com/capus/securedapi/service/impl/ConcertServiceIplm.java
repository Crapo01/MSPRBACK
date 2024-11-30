package com.capus.securedapi.service.impl;

import com.capus.securedapi.exceptions.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.capus.securedapi.entity.Concert;
import com.capus.securedapi.repository.ConcertRepository;
import com.capus.securedapi.service.ConcertService;

import java.util.List;

@Service
public class ConcertServiceIplm implements ConcertService{
	
	private final ConcertRepository concertRepository;

	
	public ConcertServiceIplm(ConcertRepository concertRepository) {
		this.concertRepository = concertRepository;
	}



	@Override
	public Concert createConcert(Concert concert) {
		return concertRepository.save(concert);
	}

	@Override
	public Concert deleteConcert(Long id) throws ApiException {
		Concert concertDeleted = concertRepository.findById(id).orElseThrow(() -> new ApiException("Id:" + id + " Not found in database", HttpStatus.NOT_FOUND));
		concertRepository.deleteById(id);
		return concertDeleted;
	}

	@Override
	public List<Concert> getAllConcerts() {
		return concertRepository.findAll();
	}

	@Override
	public Concert update(Long id, Concert request) throws ApiException {
		Concert concert = concertRepository
				.findById(id)
				.orElseThrow(() -> new ApiException("Id:" + id + " Not found in database", HttpStatus.NOT_FOUND));

		concert.setId(id);
		concert.setNom(request.getNom());
		concert.setImage(request.getImage());
		concert.setDescription(request.getDescription());
		concert.setOrigine(request.getOrigine());
		concert.setDate(request.getDate());
		concert.setHeure(request.getHeure());
		concert.setScene(request.getScene());
		concert.setLien(request.getLien());
		return concertRepository.save(concert);

	}
}
