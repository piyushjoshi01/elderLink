package com.elderlink.backend.services.impl;

import com.elderlink.backend.domains.entities.RequestEntity;
import com.elderlink.backend.repositories.RequestRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class RequestServiceImplTest{

    @Mock
    private RequestRepository requestRepository;
    @InjectMocks
    private RequestServiceImpl requestService;
    private RequestEntity request;

    @BeforeEach
    public void setup(){

        MockitoAnnotations.openMocks (this);

        request = mock(RequestEntity.class);
        request.setId (anyLong ());

    }

    @Test
    public void testFindRequestByIdSuccess(){

        when(requestRepository.existsById (anyLong ())).thenReturn (true);
        when(requestRepository.findById (anyLong ())).thenReturn (Optional.of (request));

        assertTrue (requestService.findRequestById (request.getId ()).isPresent ());
        assertEquals (requestService.findRequestById (request.getId ()).get (),request);

    }

    @Test
    public void testFindRequestByIdThrowsEntityNotFoundException(){

        when(requestRepository.existsById (anyLong ())).thenReturn (false);

        assertThrows (EntityNotFoundException.class,()->requestService.findRequestById (anyLong ()));

    }

}

