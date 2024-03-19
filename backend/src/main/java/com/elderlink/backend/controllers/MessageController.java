package com.elderlink.backend.controllers;

import com.elderlink.backend.domains.dto.MessageDto;
import com.elderlink.backend.domains.entities.MessageEntity;
import com.elderlink.backend.mappers.Mapper;
import com.elderlink.backend.services.MessageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/messages")
public class MessageController{

    @Autowired
    private MessageService messageService;

    @Autowired
    private Mapper<MessageEntity,MessageDto> messageMapper;

    @PostMapping("/create")
    public ResponseEntity createMessage(
            @Valid @RequestBody MessageDto messageDto
    ){
        MessageEntity messageEntity  = messageMapper.toEntity(messageDto);
        messageService.createMessage (messageEntity);
        return ResponseEntity.status(HttpStatus.CREATED).build ();
    }

}
