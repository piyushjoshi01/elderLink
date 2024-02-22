package com.elderlink.backend.controllers;

import com.elderlink.backend.domains.dto.RequestDto;
import com.elderlink.backend.domains.entities.RequestEntity;
import com.elderlink.backend.mappers.Mapper;
import com.elderlink.backend.services.RequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/requests")
public class RequestsController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private Mapper<RequestEntity, RequestDto> requestMapper;

    @PostMapping("/create")
    public ResponseEntity<RequestDto> createRequest(
            @Valid @RequestBody RequestDto requestDto
    ){
        RequestEntity requestEntity = requestMapper.toEntity(requestDto);
        RequestEntity createdRequest =  requestService.createRequest(requestEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(requestMapper.toDto(createdRequest));
    }

}
