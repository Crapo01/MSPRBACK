package com.capus.securedapi.service;

import com.capus.securedapi.entity.Information;
import com.capus.securedapi.repository.InformationRepository;
import com.capus.securedapi.service.impl.InformationServiceIplm;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;



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
        Information information = new Information();
        information.setMessage("Hello World");

        //WHEN
        when(informationRepository.save(any(Information.class))).thenReturn(information);

        Information savedInfo= informationService.createInformation(information);
        //THEN
        assert savedInfo != null;
    }

}