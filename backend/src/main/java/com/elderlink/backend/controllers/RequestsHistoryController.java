package com.elderlink.backend.controllers;

import com.elderlink.backend.domains.dto.RequestHistoryDto;
import com.elderlink.backend.domains.entities.RequestHistoryEntity;
import com.elderlink.backend.mappers.impl.RequestHistoryMapper;
import com.elderlink.backend.services.RequestsHistoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/requestsHistory")
public class RequestsHistoryController{

    @Autowired
    private RequestsHistoryService requestHistoryService;

    @Autowired
    private RequestHistoryMapper requestHistoryMapper;

    @GetMapping("/requestsByElderPersonId/{elderPersonId}")
    public ResponseEntity<List<RequestHistoryDto>> getRequestsHistoryByElderPersonId(
            @Valid @PathVariable("elderPersonId") Long elderPersonId
    ){
        List<RequestHistoryEntity> requestHistoryEntities = requestHistoryService.getRequestHistoriesByElderPersonId (elderPersonId);
        return ResponseEntity.status (HttpStatus.OK).body (
                requestHistoryEntities.stream ()
                        .map (requestHistoryMapper::toDto)
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("/{requestId}")
    public ResponseEntity<List<RequestHistoryDto>> getRequestHistoryByRequestId(
            @Valid @PathVariable("requestId") Long requestId
    ){
        List<RequestHistoryEntity> requestHistoryEntities = requestHistoryService.getRequestHistoriesByRequestId(requestId);
        return ResponseEntity.status (HttpStatus.OK).body (
                requestHistoryEntities.stream ()
                        .map (requestHistoryMapper::toDto)
                        .collect(Collectors.toList())
        );
    }

}
