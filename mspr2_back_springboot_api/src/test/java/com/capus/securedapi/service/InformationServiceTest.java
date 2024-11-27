package com.capus.securedapi.service;

import com.capus.securedapi.dto.InformationDto;
import com.capus.securedapi.entity.Information;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class InformationServiceTest {

    @Autowired
    private InformationService informationService;

    @Test
    void createInformation() {

        //CREATE
        InformationDto information = new InformationDto();
        information.setMessage("Hello World");

        //TEST
        InformationDto savedInformation = informationService.createInformation(information);

        //VERIFY
        assertNotNull(savedInformation);


    }
}