package com.capus.securedapi.controllers;


import com.capus.securedapi.entity.Pointeur;
import com.capus.securedapi.exceptions.ApiException;
import com.capus.securedapi.service.PointeurService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.capus.securedapi.payload.response.CustomHttpResponse.response;

@Tag(name = "Map markers", description = "Map markers APIs")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/pointeurs/")
public class PointeurController {

    private final PointeurService pointeurService;


    public PointeurController(PointeurService pointeurService) {
        this.pointeurService = pointeurService;
    }

    @ApiResponses({
            @ApiResponse(responseCode = "201", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Pointeur.class)) }),
            @ApiResponse(responseCode = "400 BadRequest", description = "Pointeur name is required")
    })
    @Operation(
            summary = "Create a new marker",
            description = "ONLY FOR EDITORS.",
            tags = { "Editor only" })
    @PostMapping
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<Object> createPointeur(@Valid @RequestBody Pointeur pointeur) {
        Pointeur createdPointeur =pointeurService.createPointeur(pointeur);
        return response(HttpStatus.CREATED,"Pointeur created",createdPointeur);
    }

    //GET ALL ACCOUNTS REST API
    @GetMapping("all")
    @Operation(
            summary = "Get all markers in DB",
            description = "All access allowed.",
            tags = { "All access allowed" })
    // ALL authorized
    public ResponseEntity<Object> getAllPointeurs() {
        List<Pointeur> pointeurs = pointeurService.getAllPointeurs();
        return response(HttpStatus.OK,"All Pointeur returned",pointeurs);
    }

    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Pointeur.class)) }),
            @ApiResponse(responseCode = "400 a", description = "No Pointeur found with id: +id"),
            @ApiResponse(responseCode = "400 b", description = "Pointeur name is required")
    })
    @Operation(
            summary = "Update data for a marker by ID",
            description = "ONLY FOR EDITORS.",
            tags = { "Editor only" })
    @PutMapping("update/{id}")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Pointeur request) throws ApiException {

        Pointeur pointeurUpdated = pointeurService.update(id,request);
        return response(HttpStatus.CREATED,"Pointeur updated",pointeurUpdated);
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
    public ResponseEntity<Object> deletePointeur(@PathVariable Long id) throws ApiException {
        return response(HttpStatus.OK,"Pointeur deleted",pointeurService.deletePointeur(id));
    }
}
