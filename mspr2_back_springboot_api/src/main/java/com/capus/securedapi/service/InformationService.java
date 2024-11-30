package com.capus.securedapi.service;



import com.capus.securedapi.entity.Information;
import com.capus.securedapi.exceptions.ApiException;

import java.util.List;


public interface InformationService {

    Information createInformation(Information information);
    Information deleteInformation(Long id) throws ApiException;

    List<Information> getAllInformation();

    Information update(Long id,Information request) throws ApiException;
}
