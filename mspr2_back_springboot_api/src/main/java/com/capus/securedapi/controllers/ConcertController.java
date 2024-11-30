package com.capus.securedapi.controllers;



import java.util.List;

import com.capus.securedapi.entity.Concert;
import com.capus.securedapi.exceptions.ApiException;
import com.capus.securedapi.repository.ConcertRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.capus.securedapi.service.ConcertService;

import static com.capus.securedapi.payload.response.CustomHttpResponse.response;

@Tag(name = "Concerts", description = "Concert APIs")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/concerts/")
public class ConcertController {
	@Autowired
	private final ConcertService concertService;
	@Autowired
	private final ConcertRepository concertRepository;

	public ConcertController(ConcertService concertService, ConcertRepository concertRepository) {
		this.concertService = concertService;
		this.concertRepository = concertRepository;
	}

	@ApiResponses({
			@ApiResponse(responseCode = "201", content = { @Content(mediaType = "application/json",
					schema = @Schema(implementation = Concert.class)) })
	})
	@Operation(
			summary = "Create a new concert",
			description = "ONLY FOR EDITORS.",
			tags = { "Editor only" })
	@PostMapping
	@PreAuthorize("hasRole('EDITOR')")
	public ResponseEntity<Object> createConcert(@Valid @RequestBody Concert concert) {
		Concert createdConcert =concertService.createConcert(concert);
		return response(HttpStatus.CREATED,"Concert created",createdConcert);
	}



	@ApiResponses({
			@ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
					schema = @Schema(implementation = Concert.class)) }),
			@ApiResponse(responseCode = "400", description = "No Concert found with id: +id")
	})
	@Operation(
			summary = "Update a concert by ID",
			description = "ONLY FOR EDITORS.",
			tags = { "Editor only" })
	@PutMapping("update/{id}")
	@PreAuthorize("hasRole('EDITOR')")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Concert request) throws ApiException {

		Concert concertUpdated = concertService.update(id,request);
		return response(HttpStatus.CREATED,"Concert updated",concertUpdated);
	}



	//GET ALL ACCOUNTS REST API
	@GetMapping("all")
	@Operation(
			summary = "Get all concerts in DB",
			description = "All access allowed.",
			tags = { "All access allowed" })
	// ALL authorized
	public ResponseEntity<Object> getAllConcerts() {
		List<Concert> concerts = concertService.getAllConcerts();
		return response(HttpStatus.OK,"All Concert returned",concerts);
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
	public ResponseEntity<Object> deleteConcert(@PathVariable Long id) throws ApiException {
		return response(HttpStatus.OK,"Concert deleted",concertService.deleteConcert(id));
	}

	
}
