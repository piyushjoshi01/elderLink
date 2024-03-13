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
    public boolean isRequestExists(Long id) {
        try {
            return requestRepository.existsById(id);
        }catch (Exception e){
            logger.error("An error occurred while checking if request exists or not. -> {}",e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

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

    @Override
    public RequestEntity updateRequest(Long requestId, RequestEntity requestEntity) {
        try {

            RequestEntity existingRequest = requestRepository.findById (requestId)
                    .orElseThrow (() -> new RuntimeException ("Request with this id is not exist!"));

            //To check user is not updating other user's requests
            isUserAuthorized.checkUserAuthority(requestEntity.getUser ().getId ());

            modelMapper.getConfiguration ().setSkipNullEnabled (true);

            modelMapper.map(requestEntity,existingRequest);

            modelMapper.getConfiguration ().setSkipNullEnabled (false);

            requestRepository.save(existingRequest);

            logger.info ("Request updated successfully.");

            return existingRequest;
        }catch (RuntimeException e){
            logger.error ("An error occurred while updating the request. -> {}",e.getMessage ());
            throw new RuntimeException(e.getMessage ());
        }
    }

    @Override
    public void deleteRequest(Long requestId) {
        try {
            RequestEntity request = requestRepository.findById(requestId)
                    .orElseThrow(() -> new RuntimeException ("Request of this id is not exist!"));

            //To check user is not deleting other user's requests
            isUserAuthorized.checkUserAuthority(request.getUser().getId());

            requestRepository.deleteById(requestId);

            logger.info ("Request deleted successfully.");
        }catch (RuntimeException e){
            logger.error ("An error occurred while deleting the request. -> {}",e.getMessage ());
            throw new RuntimeException(e.getMessage ());
        }
    }

}

