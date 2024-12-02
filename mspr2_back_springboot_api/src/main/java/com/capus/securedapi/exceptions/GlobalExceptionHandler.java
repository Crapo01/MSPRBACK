package com.capus.securedapi.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ExceptionResponse> genericException(final ApiException exception) {
        ExceptionResponse error = new ExceptionResponse();
        error.setStatus(exception.getStatus().value());
        error.setMessage(exception.getMessage());
        log.error(exception.getMessage());
        Throwable cause = exception.getCause();
        if (cause != null) {
            log.error(Arrays.stream(cause.getStackTrace()).map(a -> a.toString()).collect(Collectors.joining("\n")));
        }
        return new ResponseEntity<>(error, exception.getStatus());
    }

}

