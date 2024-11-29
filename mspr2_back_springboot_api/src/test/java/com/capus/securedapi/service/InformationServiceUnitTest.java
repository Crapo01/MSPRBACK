package com.capus.securedapi.service;

import com.capus.securedapi.dto.InformationDto;
import com.capus.securedapi.entity.Information;
import com.capus.securedapi.repository.InformationRepository;
import com.capus.securedapi.service.impl.InformationServiceIplm;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)

class InformationServiceUnitTest {

    @Mock
    private InformationRepository informationRepository;
    @InjectMocks
    private InformationServiceIplm informationService;


    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddInformationHappyPath() throws Exception {
        //GIVEN
        InformationDto informationDto = new InformationDto();
        informationDto.setMessage("Hello World");
        Information information = new Information();
        informationDto.setMessage("Hello World");
        //WHEN
        when(informationRepository.save(any(Information.class))).thenReturn(information);

        InformationDto savedInfo= informationService.createInformation(informationDto);
        //THEN
        assert savedInfo != null;
    }

}