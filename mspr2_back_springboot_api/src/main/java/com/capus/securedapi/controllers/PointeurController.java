package com.capus.securedapi.controllers;

import com.capus.securedapi.dto.PointeurDto;
import com.capus.securedapi.payload.response.MessageResponse;
import com.capus.securedapi.repository.PointeurRepositary;
import com.capus.securedapi.service.PointeurService;
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

import java.util.List;
@Tag(name = "Map markers", description = "Map markers APIs")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/pointeurs/")
public class PointeurController {

    private final PointeurService pointeurService;
    private final PointeurRepositary pointeurRepositary;

    public PointeurController(PointeurService pointeurService, PointeurRepositary pointeurRepositary) {
        this.pointeurService = pointeurService;
        this.pointeurRepositary = pointeurRepositary;
    }

    @ApiResponses({
            @ApiResponse(responseCode = "201", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = PointeurDto.class)) }),
            @ApiResponse(responseCode = "400 BadRequest", description = "Pointeur name is required")
    })
    @Operation(
            summary = "Create a new marker",
            description = "ONLY FOR EDITORS.",
            tags = { "Editor only" })
    @PostMapping
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<?> addPointeur(@RequestBody PointeurDto pointeurDto) {
        if (pointeurDto.getNom().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Pointeur name is required"));
        }
        return new ResponseEntity<>(pointeurService.createPointeur(pointeurDto), HttpStatus.CREATED);

    }

    //GET ALL ACCOUNTS REST API
    @GetMapping("all")
    @Operation(
            summary = "Get all markers in DB",
            description = "All access allowed.",
            tags = { "All access allowed" })
    public ResponseEntity<List<PointeurDto>> getAllPointeurs() {
        List<PointeurDto> pointeursDtos = pointeurService.getAllPointeurs();
        return ResponseEntity.ok(pointeursDtos);
    }

    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = PointeurDto.class)) }),
            @ApiResponse(responseCode = "400 a", description = "No Pointeur found with id: +id"),
            @ApiResponse(responseCode = "400 b", description = "Pointeur name is required")
    })
    @Operation(
            summary = "Update data for a marker by ID",
            description = "ONLY FOR EDITORS.",
            tags = { "Editor only" })
    @PutMapping("update/{id}")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody PointeurDto request) {
        if (!pointeurRepositary.existsById(id)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("No Pointeur found with id: "+id));
        }
        if (request.getNom().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Pointeur name is required"));
        }
        PointeurDto updatedPointeurDto = pointeurService.update(id, request.getNom(), request.getLat(), request.getLon(), request.getType(),request.getDescription() , request.getLien());
        return ResponseEntity.ok(updatedPointeurDto);
    }


    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Deleted pointeur "),
            @ApiResponse(responseCode = "400 BadRequest", description = "No Pointeur found with id: +id")
    })
    @Operation(
            summary = "Delete a marker by ID",
            description = "ONLY FOR EDITORS.",
            tags = { "Editor only" })
    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<?> deletePointeur(@PathVariable Long id) {
        if (!pointeurRepositary.existsById(id)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("No Pointeur found with id: "+id));
        }
        pointeurService.deletePointeur(id);
        return ResponseEntity.ok("Deleted pointeur " + id);
    }
}
