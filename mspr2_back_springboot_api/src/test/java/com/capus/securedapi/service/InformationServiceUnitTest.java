package com.capus.securedapi.service;

import com.capus.securedapi.entity.Information;
import com.capus.securedapi.exceptions.ApiException;
import com.capus.securedapi.repository.InformationRepository;
import com.capus.securedapi.service.impl.InformationServiceIplm;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)

class InformationServiceUnitTest {

    @Mock
    private InformationRepository informationRepository;
    @InjectMocks
    private InformationServiceIplm informationService;

    private Information testInfo;
    private Information requestInfo;

    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.openMocks(this);

        testInfo = new Information();
        requestInfo=new Information();
        testInfo.setId(100l);
        testInfo.setMessage("message test");
        testInfo.setImportant(true);
        requestInfo.setMessage("message test update");
        requestInfo.setId(100l);
    }


    @Test
    public void testUpdateUser_InfoExists() throws ApiException {

        when(informationRepository.findById(anyLong())).thenReturn(Optional.ofNullable(testInfo));
        when(informationRepository.save(any(Information.class))).thenReturn(requestInfo);
        Information updatedInfo = informationService.update(100L, requestInfo );
        assertEquals("message test update", updatedInfo.getMessage());
        Mockito.verify(informationRepository).findById(100L);
    }

    @Test
    public void testUpdateUser_UserNotFound() throws ApiException {
        when(informationRepository.findById(anyLong())).thenReturn(Optional.empty());
        when(informationRepository.save(any(Information.class))).thenReturn(requestInfo);
        ApiException thrown = assertThrows(ApiException.class, () -> {
            informationService.update(999L, requestInfo);
        });
        assertEquals("Info not found with id: 999", thrown.getMessage());
    }

}