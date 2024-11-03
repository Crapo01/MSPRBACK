package com.capus.nationsound.mapper;

import com.capus.nationsound.dto.ConcertDto;
import com.capus.nationsound.entity.Concert;

public class ConcertMapper {
	public static Concert mapToConcert(ConcertDto concertDto){
		Concert concert = new Concert(concertDto.getId(), concertDto.getNom(), concertDto.getImage(), concertDto.getDescription(), concertDto.getOrigine(), concertDto.getDate(), concertDto.getHeure(), concertDto.getScene(), concertDto.getLien());
		return concert;
	}
	
	public static ConcertDto mapToConcertDto(Concert concert){
		ConcertDto concertDto = new ConcertDto(concert.getId(), concert.getNom(), concert.getImage(), concert.getDescription(), concert.getOrigine(), concert.getDate(), concert.getHeure(), concert.getScene(), concert.getLien());
		return concertDto;
	}
}
