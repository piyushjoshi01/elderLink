package com.elderlink.backend.auth.services;

import com.elderlink.backend.domains.entities.UserEntity;

public interface AuthService {

    public void userRegister(UserEntity user);

}
