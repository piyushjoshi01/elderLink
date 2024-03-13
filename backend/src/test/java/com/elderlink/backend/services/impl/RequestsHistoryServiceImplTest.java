package com.elderlink.backend.services.impl;

import com.elderlink.backend.domains.entities.RequestEntity;
import com.elderlink.backend.domains.entities.RequestHistoryEntity;
import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.repositories.RequestHistoryRepository;
import com.elderlink.backend.repositories.RequestRepository;
import com.elderlink.backend.repositories.UserRepository;
import com.elderlink.backend.utils.IsUserAuthorized;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Objects;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class RequestsHistoryServiceImplTest{
    @Mock
    private IsUserAuthorized isUserAuthorized;
    @Mock
    private UserRepository userRepository;
    @Mock
    private UserServiceImpl userService;
    @Mock
    private RequestServiceImpl requestService;
    @Mock
    private RequestRepository requestRepository;
    @Mock
    private RequestHistoryRepository requestHistoryRepository;
    @InjectMocks
    private RequestsHistoryServiceImpl requestHistoryService;

    private RequestHistoryEntity requestHistoryEntity;

    private UserEntity volunteer;

    private UserEntity elderPerson;

    private RequestEntity requestEntity;

    private UserEntity user;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks (this);

        user = mock (UserEntity.class);

        volunteer = mock (UserEntity.class);

        elderPerson = mock (UserEntity.class);

        requestEntity = mock (RequestEntity.class);
        when (requestEntity.getUser ()).thenReturn (user);

        requestHistoryEntity = mock (RequestHistoryEntity.class);
        when (requestHistoryEntity.getElderPerson ()).thenReturn (elderPerson);
        when (requestHistoryEntity.getVolunteer ()).thenReturn (volunteer);
        when (requestHistoryEntity.getRequest ()).thenReturn (requestEntity);
    }

    @Test
    void testCreateRequestHistorySuccess() {
        //Arrange
        when (requestEntity.getUser ().getId ()).thenReturn (5L);
        when (requestRepository.findById (anyLong ())).thenReturn (Optional.of (requestEntity));
        when (requestService.isRequestExists (anyLong ())).thenReturn (true);

        when (requestHistoryEntity.getElderPerson ().getId ()).thenReturn (5L);
        when (requestHistoryEntity.getVolunteer ().getId ()).thenReturn (6L);
        when (requestHistoryRepository.save (any (RequestHistoryEntity.class))).thenReturn (requestHistoryEntity);

        if (Objects.equals (requestEntity.getUser ().getId (), requestHistoryEntity.getElderPerson ().getId ())) {
            // Condition is true, do nothing
        }

        when (userRepository.existsById (anyLong ())).thenReturn (true);
        when (userService.isUserExisted (anyLong ())).thenReturn (true);

        doNothing ().when (isUserAuthorized).checkUserAuthority (anyLong ());

        //Act
        RequestHistoryEntity result = requestHistoryService.createRequestHistory (requestHistoryEntity);

        //Assert
        assertEquals (requestHistoryEntity, result);
    }

    @Test
    void testCreateRequestHistoryThrowsEntityNotFoundExceptionForVolunteer(){

        doNothing().when(isUserAuthorized).checkUserAuthority(anyLong());

        when(requestHistoryEntity.getVolunteer ().getId ()).thenReturn (1L);

        when(userRepository.existsById (volunteer.getId ())).thenReturn (false);
        when(userService.isUserExisted (volunteer.getId ())).thenReturn (false);

        assertThrows (EntityNotFoundException.class,()-> requestHistoryService.createRequestHistory (requestHistoryEntity));
    }

    @Test
    void testCreateRequestHistoryThrowsEntityNotFoundExceptionForElderPerson(){
        doNothing().when(isUserAuthorized).checkUserAuthority(anyLong());

        when(requestHistoryEntity.getVolunteer ().getId ()).thenReturn (1L);
        when(requestHistoryEntity.getElderPerson ().getId ()).thenReturn (2L);

        when(userRepository.existsById (volunteer.getId ())).thenReturn (true);
        when(userService.isUserExisted (volunteer.getId ())).thenReturn (true);

        when(userRepository.existsById (elderPerson.getId ())).thenReturn (false);
        when(userService.isUserExisted (elderPerson.getId ())).thenReturn (false);

        assertThrows (EntityNotFoundException.class,()-> requestHistoryService.createRequestHistory (requestHistoryEntity));
    }
}