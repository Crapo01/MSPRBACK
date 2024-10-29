package com.capus.controller;

import com.capus.dto.PointeurDto;
import com.capus.service.PointeurService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pointeurs")
public class PointeurController {

    private final PointeurService pointeurService;

    public PointeurController(PointeurService pointeurService) {
        this.pointeurService = pointeurService;
    }

    //ADD REST API POST add account
    @CrossOrigin()
    @PostMapping
    public ResponseEntity<PointeurDto> addPointeur(@RequestBody PointeurDto pointeurDto) {
        return new ResponseEntity<>(pointeurService.createPointeur(pointeurDto), HttpStatus.CREATED);

    }

    //GET ALL ACCOUNTS REST API
    @CrossOrigin()
    @GetMapping("/all")
    public ResponseEntity<List<PointeurDto>> getAllPointeurs() {
        List<PointeurDto> pointeursDtos = pointeurService.getAllPointeurs();
        return ResponseEntity.ok(pointeursDtos);
    }

    // ADD REST API POST update
    @CrossOrigin()
    @PutMapping("/update/{id}")
    public ResponseEntity<PointeurDto> update(@PathVariable Long id, @RequestBody PointeurDto request) {

        PointeurDto updatedPointeurDto = pointeurService.update(id, request.getNom(), request.getLat(), request.getLon(), request.getType(),request.getDescription() , request.getLien());
        return ResponseEntity.ok(updatedPointeurDto);
    }


    //DELETE ACCOUNT BY ID REST API
    @CrossOrigin()
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePointeur(@PathVariable Long id) {
        pointeurService.deletePointeur(id);
        return ResponseEntity.ok("Deleted pointeur " + id);
    }
}
