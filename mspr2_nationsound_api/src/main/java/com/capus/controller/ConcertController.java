package com.capus.controller;



import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capus.dto.ConcertDto;
import com.capus.service.ConcertService;

@RestController
@RequestMapping("/api/concerts")
public class ConcertController {
	
	private final ConcertService concertService;

	public ConcertController(ConcertService concertService) {
		this.concertService = concertService;
	}
	
	//ADD REST API POST add account
	@CrossOrigin()
	@PostMapping
	public ResponseEntity<ConcertDto> addConcert(@RequestBody ConcertDto concertDto){
		System.out.println(concertDto);
		return new ResponseEntity<>(concertService.createConcert(concertDto), HttpStatus.CREATED);
	}
	
	//ADD REST API GET account get By Id
	@CrossOrigin()
	@GetMapping("/{id}")
	public ResponseEntity<ConcertDto> getConcertById(@PathVariable Long id){
		System.out.println("Get Concert by ID request");
		ConcertDto concertDto = concertService.getConcertById(id);
		return ResponseEntity.ok(concertDto);
	}
	
	// ADD REST API POST update
	@CrossOrigin()
	@PutMapping("/update/{id}")
	public ResponseEntity<ConcertDto> update(@PathVariable Long id,@RequestBody ConcertDto request){
		ConcertDto updatedConcertDto = concertService.update(id,request.getNom(),request.getImage(), request.getDescription(), request.getOrigine(), request.getDate(), request.getHeure(), request.getScene(), request.getLien());
		return ResponseEntity.ok(updatedConcertDto);
		
	}



	//GET ALL ACCOUNTS REST API
	@CrossOrigin()
	@GetMapping("/all")
	public ResponseEntity<List<ConcertDto>> getAllConcerts(){
		List<ConcertDto> concertDtos = concertService.getAllConcerts();
		return ResponseEntity.ok(concertDtos);
	}

	//DELETE ACCOUNT BY ID REST API
	@CrossOrigin()
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteConcert(@PathVariable Long id){
		System.out.println("Delete by ID request");
		concertService.deleteConcert(id);
		return ResponseEntity.ok(id+" Deleted");
	}

	
}
