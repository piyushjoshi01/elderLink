package com.elderlink.backend.controllers;

import com.elderlink.backend.auth.services.AuthService;
import com.elderlink.backend.auth.services.JwtService;
import com.elderlink.backend.auth.services.RefreshTokenService;
import com.elderlink.backend.auth.utils.AuthReq;
import com.elderlink.backend.auth.utils.AuthRes;
import com.elderlink.backend.auth.utils.LogoutReq;
import com.elderlink.backend.auth.utils.RefreshTokenReq;
import com.elderlink.backend.auth.utils.RegReq;
import com.elderlink.backend.domains.entities.RefreshTokenEntity;
import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.exceptions.UserAlreadyExistException;
import com.elderlink.backend.repositories.UserRepository;
import com.elderlink.backend.services.UserService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody RegReq regReq) {
        try {
            userService.isUserExistByEmail(regReq.getEmail());
        } catch (UserAlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        UserEntity userEntity = modelMapper.map(regReq, UserEntity.class);
        AuthRes authRes = authService.userRegister(userEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(authRes);
    }
    @PostMapping("/logout")
    public ResponseEntity logOut(@Valid @RequestBody LogoutReq logoutReq){
        try {
            refreshTokenService.deleteRefreshToken(logoutReq.getRefreshToken());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> authenticateUser(@Valid @RequestBody AuthReq authReq) {
        try {
            if(userRepository.findByEmail(authReq.getEmail()).isEmpty()){
                throw new UsernameNotFoundException("User with this email doesn't exist.");
            }
            AuthRes authRes = authService.userAuth(authReq);
            return ResponseEntity.status(HttpStatus.OK).body(authRes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<Object> refreshToken(@Valid @RequestBody RefreshTokenReq refreshTokenReq){
        try {
            RefreshTokenEntity refreshTokenEntity = refreshTokenService.verifyRefreshToken(refreshTokenReq.getRefreshToken());
            UserEntity user = refreshTokenEntity.getUser();
            var accessToken = jwtService.generateToken(user);
            return ResponseEntity.ok().body(
                    AuthRes.builder()
                            .accessToken(accessToken)
                            .refreshToken(refreshTokenEntity.getRefreshToken())
                            .build()
            );
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


}