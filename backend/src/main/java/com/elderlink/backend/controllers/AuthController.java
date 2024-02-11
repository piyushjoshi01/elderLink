package com.elderlink.backend.controllers;

import com.elderlink.backend.auth.services.AuthService;
import com.elderlink.backend.auth.utils.AuthRes;
import com.elderlink.backend.auth.utils.RegReq;
import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.exceptions.UserAlreadyExistException;
import com.elderlink.backend.services.UserService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody RegReq regReq){
            try {
                userService.isUserExistByEmail(regReq.getEmail());
            }catch (UserAlreadyExistException e){
                return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
            UserEntity userEntity = modelMapper.map(regReq, UserEntity.class);
            AuthRes authRes = authService.userRegister(userEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(authRes);
    }

}
