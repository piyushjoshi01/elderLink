package com.elderlink.backend.controllers;

import com.elderlink.backend.domains.dto.UserDto;
import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.mappers.Mapper;
import com.elderlink.backend.repositories.UserRepository;
import com.elderlink.backend.services.UserService;
import com.elderlink.backend.utils.IsUserAuthorized;
import com.elderlink.backend.auth.services.JwtService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UsersControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private IsUserAuthorized isUserAuthorized;

    @Mock
    private UserService userService;

    @Mock
    private Mapper<UserEntity, UserDto> userMapper;

    @InjectMocks
    private UsersController usersController;

    private UserDto userDto;
    private UserEntity userEntity;

    @BeforeEach
    void setUp() {
        userDto = new UserDto();
        userEntity = new UserEntity();
    }

    @Test
    void getUserByEmail_NotFound() {
        String authHeader = "Bearer token";
        String email = "email@example.com";
        when(jwtService.extractUsername(anyString())).thenReturn(email);
        when(userRepository.existsByEmail(email)).thenReturn(false);

        ResponseEntity<UserDto> response = usersController.getUserByEmail(authHeader);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void getUserByEmail_Success() {
        String authHeader = "Bearer token";
        String email = "email@example.com";
        when(jwtService.extractUsername(authHeader.substring(7))).thenReturn(email);
        when(userRepository.existsByEmail(email)).thenReturn(true);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(userEntity));
        when(userMapper.toDto(userEntity)).thenReturn(userDto);

        ResponseEntity<UserDto> response = usersController.getUserByEmail(authHeader);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    void updateUser_NotFound() {
        Long userId = 1L;
        when(userRepository.existsById(userId)).thenReturn(false);

        ResponseEntity<UserDto> response = usersController.updateUser(userId, userDto);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void updateUser_Success() {
        Long userId = 1L;
        when(userRepository.existsById(userId)).thenReturn(true);
        when(userMapper.toEntity(userDto)).thenReturn(userEntity);
        when(userService.updateUser(eq(userId), any(UserEntity.class))).thenReturn(userEntity);
        when(userMapper.toDto(userEntity)).thenReturn(userDto);

        ResponseEntity<UserDto> response = usersController.updateUser(userId, userDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    void getUserByEmail_InternalServerError() {
        String authHeader = "Bearer validToken";
        String email = "user@example.com";
        when(jwtService.extractUsername(authHeader.substring(7))).thenReturn(email);
        when(userRepository.existsByEmail(email)).thenReturn(true);
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty()); // Simulates database issue

        ResponseEntity<UserDto> response = usersController.getUserByEmail(authHeader);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    void getUserByEmail_BadRequestDueToException() {
        String authHeader = "Bearer invalidToken";
        when(jwtService.extractUsername(anyString())).thenThrow(new RuntimeException("Invalid token"));

        ResponseEntity<UserDto> response = usersController.getUserByEmail(authHeader);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }



}
