package com.capus.securedapi.controllers;



import java.util.List;

import com.capus.securedapi.dto.InformationDto;
import com.capus.securedapi.payload.response.MessageResponse;
import com.capus.securedapi.repository.ConcertRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.capus.securedapi.dto.ConcertDto;
import com.capus.securedapi.service.ConcertService;

@Tag(name = "Concerts", description = "Concert APIs")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/concerts/")
public class ConcertController {
	
	private final ConcertService concertService;
	private final ConcertRepository concertRepository;

	public ConcertController(ConcertService concertService, ConcertRepository concertRepository) {
		this.concertService = concertService;
		this.concertRepository = concertRepository;
	}

	@ApiResponses({
			@ApiResponse(responseCode = "201", content = { @Content(mediaType = "application/json",
					schema = @Schema(implementation = ConcertDto.class)) })
	})
	@Operation(
			summary = "Create a new concert",
			description = "ONLY FOR EDITORS.",
			tags = { "Editor only" })
	@PostMapping
	@PreAuthorize("hasRole('EDITOR')")
	public ResponseEntity<ConcertDto> addConcert(@RequestBody ConcertDto concertDto){
		return new ResponseEntity<>(concertService.createConcert(concertDto), HttpStatus.CREATED);
	}

	@ApiResponses({
			@ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
					schema = @Schema(implementation = ConcertDto.class)) }),
			@ApiResponse(responseCode = "400", description = "No Concert found with id: +id")
	})
	@Operation(
			summary = "Get a concert by ID",
			description = "All access allowed.",
			tags = { "All access allowed" })
	@GetMapping("{id}")
	public ResponseEntity<?> getConcertById(@PathVariable Long id) {
		if (!concertRepository.existsById(id)) {
			return ResponseEntity
					.internalServerError()
					.body(new MessageResponse("No concert found with id: "+id));
		}
		ConcertDto concertDto = concertService.getConcertById(id);
		return ResponseEntity.ok(concertDto);
	}

	@ApiResponses({
			@ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
					schema = @Schema(implementation = ConcertDto.class)) }),
			@ApiResponse(responseCode = "400", description = "No Concert found with id: +id")
	})
	@Operation(
			summary = "Update a concert by ID",
			description = "ONLY FOR EDITORS.",
			tags = { "Editor only" })
	@PutMapping("update/{id}")
	@PreAuthorize("hasRole('EDITOR')")
	public ResponseEntity<?> update(@PathVariable Long id,@RequestBody ConcertDto request){
		if (!concertRepository.existsById(id)) {
			return ResponseEntity
					.internalServerError()
					.body(new MessageResponse("No concert found with id: "+id));
		}
		ConcertDto updatedConcertDto = concertService.update(id,request.getNom(),request.getImage(), request.getDescription(), request.getOrigine(), request.getDate(), request.getHeure(), request.getScene(), request.getLien());
		return ResponseEntity.ok(updatedConcertDto);
		
	}



	//GET ALL ACCOUNTS REST API
	@GetMapping("all")
	@Operation(
			summary = "Get all concerts in DB",
			description = "All access allowed.",
			tags = { "All access allowed" })
	public ResponseEntity<List<ConcertDto>> getAllConcerts(){
		List<ConcertDto> concertDtos = concertService.getAllConcerts();
		return ResponseEntity.ok(concertDtos);
	}

	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "Deleted Concert "),
			@ApiResponse(responseCode = "400", description = "No Concert found with id: +id")
	})
	@Operation(
			summary = "Delete a concert by ID",
			description = "ONLY FOR EDITORS.",
			tags = { "Editor only" })
	@DeleteMapping("{id}")
	@PreAuthorize("hasRole('EDITOR')")
	public ResponseEntity<?> deleteConcert(@PathVariable Long id){
		if (!concertRepository.existsById(id)) {
			return ResponseEntity
					.internalServerError()
					.body(new MessageResponse("No concert found with id: "+id));
		}
		System.out.println("Delete by ID request");
		concertService.deleteConcert(id);
		return ResponseEntity.ok(id+" Deleted");
	}

	
}
