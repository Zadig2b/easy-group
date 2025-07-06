package com.base.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateListNameException.class)
    public ResponseEntity<String> handleDuplicateListName(DuplicateListNameException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)  // code HTTP 409
                .body(ex.getMessage());      // message défini dans l'exception
    }

}
