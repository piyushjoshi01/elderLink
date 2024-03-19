package com.elderlink.backend.services.impl;

import com.elderlink.backend.domains.entities.BlogEntity;
import com.elderlink.backend.repositories.BlogRepository;
import com.elderlink.backend.repositories.UserRepository;
import com.elderlink.backend.services.BlogService;
import com.elderlink.backend.services.UserService;
import com.elderlink.backend.utils.IsUserAuthorized;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {

    Logger logger = LoggerFactory.getLogger(BlogService.class);
    private static final Logger log = LoggerFactory.getLogger(BlogService.class);

    @Autowired
    private UserService userService;
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private IsUserAuthorized isUserAuthorized;
    @Autowired
    private UserRepository userRepository;


}
