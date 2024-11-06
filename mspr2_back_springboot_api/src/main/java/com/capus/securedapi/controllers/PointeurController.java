package com.capus.securedapi.controllers;

import com.capus.securedapi.dto.PointeurDto;
import com.capus.securedapi.service.PointeurService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/pointeurs/")
public class PointeurController {

    private final PointeurService pointeurService;

    public PointeurController(PointeurService pointeurService) {
        this.pointeurService = pointeurService;
    }

    //ADD REST API POST add account
    @PostMapping
    @PreAuthorize("hasRole('EDITOR') or hasRole('ADMIN')")
    public ResponseEntity<PointeurDto> addPointeur(@RequestBody PointeurDto pointeurDto) {
        return new ResponseEntity<>(pointeurService.createPointeur(pointeurDto), HttpStatus.CREATED);

    }

    //GET ALL ACCOUNTS REST API
    @GetMapping("all")
    // ALL authorized
    public ResponseEntity<List<PointeurDto>> getAllPointeurs() {
        List<PointeurDto> pointeursDtos = pointeurService.getAllPointeurs();
        return ResponseEntity.ok(pointeursDtos);
    }

    // ADD REST API POST update
    @PutMapping("update/{id}")
    @PreAuthorize("hasRole('EDITOR') or hasRole('ADMIN')")
    public ResponseEntity<PointeurDto> update(@PathVariable Long id, @RequestBody PointeurDto request) {

        PointeurDto updatedPointeurDto = pointeurService.update(id, request.getNom(), request.getLat(), request.getLon(), request.getType(),request.getDescription() , request.getLien());
        return ResponseEntity.ok(updatedPointeurDto);
    }


    //DELETE ACCOUNT BY ID REST API
    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('EDITOR') or hasRole('ADMIN')")
    public ResponseEntity<String> deletePointeur(@PathVariable Long id) {
        pointeurService.deletePointeur(id);
        return ResponseEntity.ok("Deleted pointeur " + id);
    }
}
