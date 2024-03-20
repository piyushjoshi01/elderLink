package com.elderlink.backend.services.impl;

import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.repositories.UserRepository;
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

public class UserServiceImplTest{

    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserServiceImpl userService;
    private UserEntity user;

    @BeforeEach
    public void setup(){

        MockitoAnnotations.openMocks (this);

        user = mock(UserEntity.class);
        user.setId (anyLong ());

    }

    @Test
    public void testGetUserByIdSuccess(){

        when (userRepository.findById (user.getId ())).thenReturn (Optional.of (user));

        assertTrue (userService.getUserById (user.getId ()).isPresent ());
        assertEquals (userService.getUserById (user.getId ()).get (),user);

    }

    @Test
    public void testGetUserByIdFailure(){

        when (userRepository.findById (user.getId ())).thenThrow (new RuntimeException ());

        assertThrows (RuntimeException.class,()-> userService.getUserById (user.getId ()));
    }

}

