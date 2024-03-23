package com.elderlink.backend.services.impl;

import com.elderlink.backend.domains.entities.RequestEntity;
import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.exceptions.UserIsNotAuthorizedException;
import com.elderlink.backend.repositories.RequestRepository;
import com.elderlink.backend.services.impl.RequestServiceImpl;
import com.elderlink.backend.utils.IsUserAuthorized;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.module.Configuration;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class RequestServiceImplTest {

    @Mock
    private RequestRepository requestRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private IsUserAuthorized isUserAuthorized;

    @InjectMocks
    private RequestServiceImpl requestService;

    private UserEntity user;
    private RequestEntity requestEntity;

    @BeforeEach
    void setUp() {
        // Initialize common objects used across tests
        user = new UserEntity();
        user.setId(1L); // Example user ID

        requestEntity = new RequestEntity();
        requestEntity.setUser(user);
    }

    @Test
    void createRequest_Successful() {
        when(requestRepository.save(any(RequestEntity.class))).thenReturn(requestEntity);

        RequestEntity created = requestService.createRequest(requestEntity);

        assertEquals(requestEntity, created);
        verify(requestRepository, times(1)).save(requestEntity);
    }

    @Test
    void findRequestsByUserId_Successful() {
        Long userId = user.getId();
        List<RequestEntity> expectedRequests = Collections.singletonList(requestEntity);
        when(requestRepository.findByUserId(userId)).thenReturn(expectedRequests);

        List<RequestEntity> requests = requestService.findRequestsByUserId(userId);

        assertEquals(expectedRequests, requests);
        verify(requestRepository, times(1)).findByUserId(userId);
    }

    @Test
    void updateRequest_RequestNotFound() {
        Long requestId = 1L;
        when(requestRepository.findById(requestId)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> requestService.updateRequest(requestId, requestEntity));
    }

    @Test
    void deleteRequest_Successful() {
        Long requestId = 1L;
        requestEntity.setId(requestId);
        when(requestRepository.findById(requestId)).thenReturn(Optional.of(requestEntity));

        requestService.deleteRequest(requestId);

        verify(requestRepository, times(1)).deleteById(requestId);
    }

    @Test
    void deleteRequest_RequestNotFound() {
        Long requestId = 1L;
        when(requestRepository.findById(requestId)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> requestService.deleteRequest(requestId));
    }
}
