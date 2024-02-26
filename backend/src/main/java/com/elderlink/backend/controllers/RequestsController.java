package com.elderlink.backend.controllers;

import com.elderlink.backend.domains.dto.RequestDto;
import com.elderlink.backend.domains.entities.RequestEntity;
import com.elderlink.backend.mappers.Mapper;
import com.elderlink.backend.repositories.UserRepository;
import com.elderlink.backend.services.RequestService;
import com.elderlink.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/requests")
public class RequestsController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private UserRepository userRepository;

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

    @GetMapping("/{userId}")
    public ResponseEntity<List<RequestDto>> getRequestsByUserId(@Valid @PathVariable Long userId){
            if(!userRepository.existsById(userId)){
                throw new UsernameNotFoundException("User doesn't exist!");
            }
            List<RequestEntity> userRequests = requestService.findRequestsByUserId(userId);
            return ResponseEntity.status(HttpStatus.OK).body(
                    userRequests.stream()
                            .map(requestMapper::toDto)
                            .collect(Collectors.toList())
            );
    }

    @PatchMapping("/{requestId}")
    public ResponseEntity<RequestDto> updateRequest(
            @Valid @PathVariable Long requestId,
            @Valid @RequestBody RequestDto updateRequestDto
    ){
        RequestEntity requestEntity = requestMapper.toEntity (updateRequestDto);
        RequestEntity updatedRequest = requestService.updateRequest(requestId,requestEntity);
        return ResponseEntity.status (HttpStatus.OK).body (requestMapper.toDto(updatedRequest));
    }

}
