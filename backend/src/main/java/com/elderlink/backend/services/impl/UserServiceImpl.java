package com.elderlink.backend.services.impl;

import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.exceptions.UserAlreadyExistException;
import com.elderlink.backend.repositories.UserRepository;
import com.elderlink.backend.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public void isUserExistByEmail(String email) {
        Optional<UserEntity> existedUser = userRepository.findByEmail(email);
           if(existedUser.isPresent()){
               log.warn("User with email {} already exists." , email);
               throw new UserAlreadyExistException("User with this email " + email + " already exists.");
           }
    }
}
