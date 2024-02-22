package com.elderlink.backend.services.impl;

import com.elderlink.backend.domains.entities.RequestEntity;
import com.elderlink.backend.repositories.RequestRepository;
import com.elderlink.backend.services.RequestService;
import com.elderlink.backend.utils.IsUserAuthorized;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestServiceImpl implements RequestService {

    Logger logger = LoggerFactory.getLogger(RequestService.class);

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IsUserAuthorized isUserAuthorized;

    @Override
    public RequestEntity createRequest(RequestEntity requestEntity) {
        try {
            //To check user is not creating request of other user
            isUserAuthorized.checkUserAuthority(requestEntity.getUser().getId());

            RequestEntity createdRequest = requestRepository.save(requestEntity);
            logger.info("Request created successfully.");

            return createdRequest;

        }catch (RuntimeException e){
            logger.error("An error occurred while updating the user. -> {}",e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<RequestEntity> findRequestsByUserId(Long userId) {
        try {
            //To check user is not asking for other user's requests
            isUserAuthorized.checkUserAuthority(userId);

            return requestRepository.findByUserId(userId);
        }catch (RuntimeException e){
            logger.error("An error occurred while fetching user's requests. -> {}",e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
}
