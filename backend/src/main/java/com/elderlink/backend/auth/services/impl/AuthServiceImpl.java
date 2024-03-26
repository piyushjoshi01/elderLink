package com.elderlink.backend.auth.services.impl;

import com.elderlink.backend.auth.services.AuthService;
import com.elderlink.backend.auth.services.JwtService;
import com.elderlink.backend.auth.services.RefreshTokenService;
import com.elderlink.backend.auth.utils.AuthReq;
import com.elderlink.backend.auth.utils.AuthRes;
import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Period;

@Service
public class AuthServiceImpl implements AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Registers a new user.
     *
     * @param userReq The user entity containing registration details
     * @return An authentication response containing access and refresh tokens
     */
    @Override
    public AuthRes userRegister(UserEntity userReq) {
        try {


            String userType = String.valueOf(userReq.getUserType());

            Period period = Period.between(userReq.getBirthDate(), LocalDate.now());
            int ageofconcent = 18;
            int retirnmentage = 60;
            int multiplicationfactor = 10;
            int userAge = period.getYears();
            int pointsToAllocate = (userAge - ageofconcent ) * multiplicationfactor;

            if(userAge>=retirnmentage && !userType.equals("ELDER_PERSON")){
                throw new RuntimeException("User with 60 plus age can't register as a VOLUNTEER.");
            }

            if(userAge<retirnmentage && !userType.equals("VOLUNTEER")){
                throw new RuntimeException("User with less than 60 age can't register as a ELDER_PERSON");
            }

            //allocate creditBalance based on user's age
            if(userAge>ageofconcent){
                userReq.setCreditBalance(BigDecimal.valueOf(pointsToAllocate));
            }else{
                userReq.setCreditBalance(BigDecimal.valueOf(0));
            }

            UserEntity user = UserEntity.builder()
                    .firstName(userReq.getFirstName())
                    .lastName(userReq.getLastName())
                    .password(passwordEncoder.encode(userReq.getPassword()))
                    .userType(userReq.getUserType())
                    .phone(userReq.getPhone())
                    .birthDate(userReq.getBirthDate())
                    .address(userReq.getAddress())
                    .creditBalance(userReq.getCreditBalance())
                    .email(userReq.getEmail())
                    .build();

            userRepository.save(user);

            logger.info("User registered successfully : {}", user.getEmail());

            var jwtToken = jwtService.generateToken(user);
            var refreshToken = refreshTokenService.createRefreshToken(user.getEmail());
            return AuthRes.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken.getRefreshToken())
                    .build();

        }catch (Exception e){
            logger.error("An error occurred while registering the user.");
            throw new RuntimeException("An error occurred while registering the user. -> " + e.getMessage());
        }
    }
    /**
     * Authenticates a user.
     *
     * @param authReq The authentication request containing user credentials
     * @return An authentication response containing access and refresh tokens
     */

    @Override
    public AuthRes userAuth(AuthReq authReq) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authReq.getEmail(),
                            authReq.getPassword()
                    )
            );
            var user = userRepository.findByEmail(authReq.getEmail())
                    .orElseThrow();
            var jwtToken = jwtService.generateToken(user);
            var refreshToken = refreshTokenService.createRefreshToken(user.getEmail());

            logger.info("User authenticated successfully : {}", user.getEmail());

            return AuthRes.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken.getRefreshToken())
                    .build();
        }catch (Exception e){
            logger.error("An error occurred while authenticating the user. -> {}",e.getMessage());
            throw new RuntimeException("An error occurred while authenticating the user. -> " + e.getMessage());
        }
    }
}
