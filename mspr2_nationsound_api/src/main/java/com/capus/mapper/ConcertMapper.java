package com.capus.mapper;

import com.capus.dto.ConcertDto;
import com.capus.entity.Concert;

public class ConcertMapper {
	public static Concert mapToConcert(ConcertDto accountDto){
		Concert account = new Concert(accountDto.getId(), accountDto.getNom(), accountDto.getImage(), accountDto.getDescription(), accountDto.getOrigine(), accountDto.getDate(), accountDto.getHeure(), accountDto.getScene());
		return account;		
	}
	
	public static ConcertDto mapToConcertDto(Concert account){
		ConcertDto accountDto = new ConcertDto(account.getId(), account.getNom(), account.getImage(), account.getDescription(), account.getOrigine(), account.getDate(), account.getHeure(), account.getScene());
		return accountDto;		
	}
}
