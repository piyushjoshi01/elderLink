package com.elderlink.backend.services;

import com.elderlink.backend.domains.entities.UserEntity;

public interface UserService {

    public void isUserExistByEmail(String email);


    public UserEntity updateUser(Long id, UserEntity userEntity);
}
