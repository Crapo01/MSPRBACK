package com.capus.securedapi.service;


import com.capus.securedapi.entity.Concert;
import com.capus.securedapi.exceptions.ApiException;

import java.util.List;

public interface ConcertService {
	Concert createConcert(Concert concert);
	Concert deleteConcert(Long id) throws ApiException;

	List<Concert> getAllConcerts();

	Concert update(Long id,Concert request) throws ApiException;
}
