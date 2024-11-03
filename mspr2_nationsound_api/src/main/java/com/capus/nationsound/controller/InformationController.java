package com.capus.nationsound.controller;

import com.capus.nationsound.dto.InformationDto;
import com.capus.nationsound.service.InformationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/informations")
public class InformationController {

    private final InformationService informationService;

    public InformationController(InformationService informationService) {
        this.informationService = informationService;
    }

    //ADD REST API POST add account
    @CrossOrigin()
    @PostMapping
    public ResponseEntity<InformationDto> addInformation(@RequestBody InformationDto informationDto) {
        return new ResponseEntity<>(informationService.createInformation(informationDto), HttpStatus.CREATED);
    }

    //GET ALL ACCOUNTS REST API
    @CrossOrigin()
    @GetMapping("/all")
    public ResponseEntity<List<InformationDto>> getAllInformation() {
        List<InformationDto> informationDtos = informationService.getAllInformation();
        return ResponseEntity.ok(informationDtos);
    }

    // ADD REST API POST update
    @CrossOrigin()
    @PutMapping("/update/{id}")
    public ResponseEntity<InformationDto> update(@PathVariable Long id, @RequestBody InformationDto request) {
        InformationDto updatedInformationDto = informationService.update(id, request.getMessage(), request.isImportant());
        return ResponseEntity.ok(updatedInformationDto);
    }

    //DELETE ACCOUNT BY ID REST API
    @CrossOrigin()
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInformation(@PathVariable Long id) {
        informationService.deleteInformation(id);
        return ResponseEntity.ok("Deleted Information " + id);
    }
}
