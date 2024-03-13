package com.elderlink.backend.controllers;

import com.elderlink.backend.domains.dto.RequestHistoryDto;
import com.elderlink.backend.mappers.impl.RequestHistoryMapper;
import com.elderlink.backend.services.RequestsHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/requestsHistory")
public class RequestsHistoryController{

    @Autowired
    private RequestsHistoryService requestHistoryService;

    @Autowired
    private RequestHistoryMapper requestHistoryMapper;


}
