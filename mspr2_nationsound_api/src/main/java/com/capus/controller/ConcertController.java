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
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@PostMapping
	public ResponseEntity<ConcertDto> addAccount(@RequestBody ConcertDto concertDto){
		System.out.println(concertDto);
		return new ResponseEntity<>(concertService.createConcert(concertDto), HttpStatus.CREATED);
	}
	
	//ADD REST API GET account get By Id
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@GetMapping("/{id}")
	public ResponseEntity<ConcertDto> getConcertById(@PathVariable Long id){
		System.out.println("Get Concert by ID request");
		ConcertDto concertDto = concertService.getConcertById(id);
		return ResponseEntity.ok(concertDto);
	}
	
	// ADD REST API POST update
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@PutMapping("/{id}/update")
	public ResponseEntity<ConcertDto> update(@PathVariable Long id,@RequestBody ConcertDto request){
		System.out.println("Update: "+request);

		ConcertDto updatedConcertDto = concertService.update(id,request.getNom(),request.getImage(), request.getDescription(), request.getOrigine(), request.getDate(), request.getHeure(), request.getScene());
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
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteConcert(@PathVariable Long id){
		System.out.println("Delete by ID request");
		concertService.deleteConcert(id);
		return ResponseEntity.ok(id+" Deleted");
	}

	
}
