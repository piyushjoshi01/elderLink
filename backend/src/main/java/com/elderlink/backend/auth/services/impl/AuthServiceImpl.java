package com.elderlink.backend.auth.services.impl;

import com.elderlink.backend.auth.services.AuthService;
import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Period;

@Service
public class AuthServiceImpl implements AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public void userRegister(UserEntity userReq) {
        try {


            String userType = String.valueOf(userReq.getUserType());

            Period period = Period.between(userReq.getBirthDate(), LocalDate.now());

            int userAge = period.getYears();
            int pointsToAllocate = (userAge - 18) * 10;

            if(userAge>=60 && !userType.equals("ELDER_PERSON")){
                throw new RuntimeException("User with 60 plus age can't register as a VOLUNTEER.");
            }

            if(userAge<60 && !userType.equals("VOLUNTEER")){
                throw new RuntimeException("User with less than 60 age can't register as a ELDER_PERSON");
            }

            //allocate creditBalance based on user's age
            if(userAge>18){
                userReq.setCreditBalance(BigDecimal.valueOf(pointsToAllocate));
            }else{
                userReq.setCreditBalance(BigDecimal.valueOf(0));
            }

            UserEntity user = UserEntity.builder()
                    .firstName(userReq.getFirstName())
                    .lastName(userReq.getLastName())
                    .password(userReq.getPassword())
                    .userType(userReq.getUserType())
                    .phone(userReq.getPhone())
                    .birthDate(userReq.getBirthDate())
                    .address(userReq.getAddress())
                    .creditBalance(userReq.getCreditBalance())
                    .email(userReq.getEmail())
                    .build();

            userRepository.save(user);

            logger.info("User registered successfully : {}", user.getEmail());

        }catch (Exception e){
            logger.error("An error occurred while registering the user.");
            throw new RuntimeException("An error occurred while registering the user.");
        }
    }
}
