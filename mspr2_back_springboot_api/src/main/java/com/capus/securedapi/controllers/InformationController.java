package com.capus.securedapi.controllers;

import com.capus.securedapi.dto.InformationDto;
import com.capus.securedapi.service.InformationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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

    private final InformationService informationService;

    public InformationController(InformationService informationService) {
        this.informationService = informationService;
    }

    //ADD REST API POST add account
    @Operation(
            summary = "Create a new info",
            description = "ONLY FOR EDITORS.",
            tags = { "Editor only" })
    @PostMapping
    @PreAuthorize("hasRole('EDITOR') or hasRole('ADMIN')")
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

    // ADD REST API POST update
    @Operation(
            summary = "Update an info by ID",
            description = "ONLY FOR EDITORS.",
            tags = { "Editor only" })
    @PutMapping("update/{id}")
    @PreAuthorize("hasRole('EDITOR') or hasRole('ADMIN')")
    public ResponseEntity<InformationDto> update(@PathVariable Long id, @RequestBody InformationDto request) {
        InformationDto updatedInformationDto = informationService.update(id, request.getMessage(), request.isImportant());
        return ResponseEntity.ok(updatedInformationDto);
    }

    //DELETE ACCOUNT BY ID REST API
    @Operation(
            summary = "Delete an info by ID",
            description = "ONLY FOR EDITORS.",
            tags = { "Editor only" })
    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('EDITOR') or hasRole('ADMIN')")
    public ResponseEntity<String> deleteInformation(@PathVariable Long id) {
        informationService.deleteInformation(id);
        return ResponseEntity.ok("Deleted Information " + id);
    }
}
