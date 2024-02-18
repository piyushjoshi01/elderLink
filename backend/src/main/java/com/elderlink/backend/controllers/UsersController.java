package com.elderlink.backend.controllers;

import com.elderlink.backend.auth.services.JwtService;
import com.elderlink.backend.domains.dto.UserDto;
import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.mappers.Mapper;
import com.elderlink.backend.repositories.UserRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UsersController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private Mapper<UserEntity,UserDto> userMapper;

    @GetMapping("/getUser")
    public ResponseEntity<UserDto> getUserByEmail(
            @RequestHeader("Authorization") String authHeader
    ){
        try{
            //Extracting the accessToken from header as token starts with "Bearer "
            String accessToken = authHeader.substring(7);
            String email = jwtService.extractUsername(accessToken);
            if(!userRepository.existsByEmail(email)){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            Optional<UserEntity> currentUser= userRepository.findByEmail(email);
            if(currentUser.isPresent()){
                UserDto user = userMapper.toDto(currentUser.get());
                return ResponseEntity.ok().body(user);
            }else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
