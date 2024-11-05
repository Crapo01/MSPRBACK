package com.capus.securedapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capus.securedapi.entity.Concert;

public interface ConcertRepository extends JpaRepository<Concert, Long> {

	//Concert save(Iterable<Object> o);
	

}
