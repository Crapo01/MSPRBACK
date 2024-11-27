package com.capus.securedapi.controllers;

import com.capus.securedapi.dto.InformationDto;
import com.capus.securedapi.dto.PointeurDto;
import com.capus.securedapi.payload.response.MessageResponse;
import com.capus.securedapi.repository.InformationRepository;
import com.capus.securedapi.service.InformationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Infos", description = "Infos APIs")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/informations/")
public class InformationController {

    @Autowired
    private final InformationService informationService;
    @Autowired
    private final InformationRepository informationRepository;

    public InformationController(InformationService informationService, InformationRepository informationRepository) {
        this.informationService = informationService;
        this.informationRepository = informationRepository;
    }

    @ApiResponses({
            @ApiResponse(responseCode = "201", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = InformationDto.class)) })
    })
    @Operation(
            summary = "Create a new info",
            description = "ONLY FOR EDITORS.",
            tags = { "Editor only" })
    @PostMapping
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<InformationDto> addInformation(@RequestBody InformationDto informationDto) {
        return new ResponseEntity<>(informationService.createInformation(informationDto), HttpStatus.CREATED);
    }

    //GET ALL ACCOUNTS REST API
    @Operation(
            summary = "Get all infos in DB",
            description = "All access allowed.",
            tags = { "All access allowed" })
    @GetMapping("all")
    // ALL authorized
    public ResponseEntity<List<InformationDto>> getAllInformation() {
        List<InformationDto> informationDtos = informationService.getAllInformation();
        return ResponseEntity.ok(informationDtos);
    }

    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = InformationDto.class)) }),
            @ApiResponse(responseCode = "400", description = "No Information found with id: +id")
    })
    @Operation(
            summary = "Update an info by ID",
            description = "ONLY FOR EDITORS.",
            tags = { "Editor only" })
    @PutMapping("update/{id}")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody InformationDto request) {
        if (!informationRepository.existsById(id)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("No Information found with id: "+id));
        }
        InformationDto updatedInformationDto = informationService.update(id, request.getMessage(), request.isImportant());
        return ResponseEntity.ok(updatedInformationDto);
    }

    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Deleted Information "),
            @ApiResponse(responseCode = "400", description = "No Information found with id: +id")
    })
    @Operation(
            summary = "Delete an info by ID",
            description = "ONLY FOR EDITORS.",
            tags = { "Editor only" })
    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('EDITOR') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteInformation(@PathVariable Long id) {
        if (!informationRepository.existsById(id)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("No Information found with id: "+id));
        }
        informationService.deleteInformation(id);
        return ResponseEntity.ok("Deleted Information " + id);
    }
}
