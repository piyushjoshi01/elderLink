package com.elderlink.backend.services.impl;

import com.elderlink.backend.domains.entities.MessageEntity;
import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.repositories.MessageRepository;
import com.elderlink.backend.repositories.UserRepository;
import com.elderlink.backend.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MessageServiceImplTest{

    @Mock
    private MessageRepository messageRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private UserService userService;
    @InjectMocks
    private MessageServiceImpl messageService;

    private MessageEntity messageEntity;

    private UserEntity sender;
    private UserEntity receiver;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks (this);

        sender = mock (UserEntity.class);
        receiver = mock (UserEntity.class);

        messageEntity = mock (MessageEntity.class);
        when (messageEntity.getSender ()).thenReturn (sender);
        when (messageEntity.getReceiver ()).thenReturn (receiver);
    }

    @Test
    void testCreateMessageSuccess() {
        // Arrange
        when (userService.isUserExisted (sender.getId ())).thenReturn (true);
        when (userService.isUserExisted (receiver.getId ())).thenReturn (true);

        // Act
        assertDoesNotThrow (() -> messageService.createMessage (messageEntity));

        // Assert
        verify (messageRepository).save (messageEntity);
    }

    @Test
    void testCreateMessageThrowsEntityNotFoundExceptionForSender() {
        // Arrange
        when (userService.isUserExisted (sender.getId ())).thenReturn (false);

        // Act & Assert
        EntityNotFoundException exception = assertThrows (EntityNotFoundException.class,
                () -> messageService.createMessage (messageEntity));
        assertEquals ("Sender with this id doesn't exist!", exception.getMessage ());
        verify (messageRepository, never ()).save (messageEntity);
    }

    @Test
    void testCreateMessageThrowsRuntimeException() {
        // Arrange
        when (userService.isUserExisted (sender.getId ())).thenReturn (true);
        when (userService.isUserExisted (receiver.getId ())).thenReturn (true);
        doThrow (new RuntimeException ("Database error")).when (messageRepository).save (messageEntity);

        // Act & Assert
        RuntimeException exception = assertThrows (RuntimeException.class,
                () -> messageService.createMessage (messageEntity));
        assertEquals ("Database error", exception.getMessage ());
    }
}