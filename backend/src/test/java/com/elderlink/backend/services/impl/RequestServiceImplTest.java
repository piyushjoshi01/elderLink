package com.elderlink.backend.services.impl;

import com.elderlink.backend.domains.entities.RequestEntity;
import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.exceptions.UserIsNotAuthorizedException;
import com.elderlink.backend.repositories.RequestRepository;
import com.elderlink.backend.services.impl.RequestServiceImpl;
import com.elderlink.backend.utils.IsUserAuthorized;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
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

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

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
    void setUpSecurityContext() {
        Authentication authentication = new UsernamePasswordAuthenticationToken("user@example.com", "password", Collections.emptyList());
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
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

    @Test
    void findRequestById_RequestNotFound() {
        when(requestRepository.existsById(anyLong())).thenReturn(false);

        assertThrows(EntityNotFoundException.class, () -> requestService.findRequestById(1L));
    }

    @Test
    void findRequestById_ThrowsException() {
        when(requestRepository.existsById(anyLong())).thenThrow(new RuntimeException("Database error"));

        Exception exception = assertThrows(EntityNotFoundException.class, () -> requestService.findRequestById(1L));

        assertEquals("An error occurred while finding request by id!", exception.getMessage());
    }

    @Test
    void createRequest_ThrowsException() {
        when(requestRepository.save(any(RequestEntity.class))).thenThrow(new RuntimeException("Save failed"));

        assertThrows(RuntimeException.class, () -> requestService.createRequest(requestEntity));
    }

    @Test
    void findRequestsByUserId_ThrowsException() {
        when(requestRepository.findByUserId(anyLong())).thenThrow(new RuntimeException("Query failed"));

        assertThrows(RuntimeException.class, () -> requestService.findRequestsByUserId(1L));
    }

    @Test
    void isRequestExists_ReturnsTrue_WhenRequestExists() {
        Long requestId = 1L;
        when(requestRepository.existsById(requestId)).thenReturn(true);

        boolean exists = requestService.isRequestExists(requestId);

        assertTrue(exists);
        verify(requestRepository, times(1)).existsById(requestId);
    }

    @Test
    void isRequestExists_ReturnsFalse_WhenRequestDoesNotExist() {
        Long requestId = 1L;
        when(requestRepository.existsById(requestId)).thenReturn(false);

        boolean exists = requestService.isRequestExists(requestId);

        assertFalse(exists);
        verify(requestRepository, times(1)).existsById(requestId);
    }

    @Test
    void isRequestExists_ThrowsRuntimeException_OnRepositoryException() {
        Long requestId = 1L;
        String errorMessage = "Database error";
        when(requestRepository.existsById(requestId)).thenThrow(new RuntimeException(errorMessage));

        RuntimeException thrown = assertThrows(RuntimeException.class, () -> requestService.isRequestExists(requestId));

        assertEquals(errorMessage, thrown.getMessage());
        verify(requestRepository, times(1)).existsById(requestId);
    }

    @Test
    void getAllRequests_Successful() {
        List<RequestEntity> expectedRequests = Collections.singletonList(requestEntity);
        when(requestRepository.findAll()).thenReturn(expectedRequests);

        List<RequestEntity> allRequests = requestService.getAllRequests();

        assertNotNull(allRequests);
        assertEquals(expectedRequests.size(), allRequests.size());
        assertEquals(expectedRequests, allRequests);
        verify(requestRepository, times(1)).findAll();
    }

    @Test
    void updateRequest_Successful_WithAuthorization() {
        Long requestId = 1L;
        RequestEntity existingRequest = requestEntity; // Assuming requestEntity is already initialized in @BeforeEach
        existingRequest.setUser(user); // Ensure the request is associated with the user
        // Assuming user is the authenticated user initialized in @BeforeEach
        user.setEmail("user@example.com"); // Email must match the one set in Authentication

        // Set up the SecurityContext to simulate the authenticated user
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), "password", Collections.emptyList());
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(requestRepository.findById(requestId)).thenReturn(Optional.of(existingRequest));
        doNothing().when(isUserAuthorized).checkUserAuthority(anyLong()); // Simulate successful authorization
        when(requestRepository.save(any(RequestEntity.class))).thenReturn(existingRequest);

        RequestEntity result = requestService.updateRequest(requestId, existingRequest);

        assertNotNull(result);
        verify(requestRepository, times(1)).save(existingRequest);
        verify(isUserAuthorized).checkUserAuthority(user.getId()); // Ensure authorization check was simulated
    }


    @Test
    void updateRequest_Failed_Authorization() {
        Long requestId = 1L;
        RequestEntity toBeUpdated = requestEntity; // assuming initialized in @BeforeEach

        when(requestRepository.findById(requestId)).thenReturn(Optional.of(toBeUpdated));
        doThrow(new UserIsNotAuthorizedException("You are not authorized to perform this operation!"))
                .when(isUserAuthorized).checkUserAuthority(anyLong()); // Simulate failed authorization

        assertThrows(UserIsNotAuthorizedException.class, () -> requestService.updateRequest(requestId, toBeUpdated));

        verify(requestRepository, never()).save(any(RequestEntity.class));
        verify(isUserAuthorized).checkUserAuthority(user.getId()); // Ensure authorization check was attempted
    }


    @Test
    void updateRequest_ChecksAuthorization() {
        Long requestId = 1L;
        RequestEntity toUpdate = new RequestEntity();
        toUpdate.setUser(user);

        when(requestRepository.findById(requestId)).thenReturn(Optional.of(requestEntity));
        doNothing().when(isUserAuthorized).checkUserAuthority(anyLong());
        when(requestRepository.save(any(RequestEntity.class))).thenReturn(toUpdate);

        requestService.updateRequest(requestId, toUpdate);

        verify(isUserAuthorized, times(1)).checkUserAuthority(anyLong());
    }

}
