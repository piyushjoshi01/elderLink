package com.elderlink.backend.services.impl;

import com.elderlink.backend.domains.entities.RequestEntity;
import com.elderlink.backend.domains.entities.RequestHistoryEntity;
import com.elderlink.backend.repositories.RequestHistoryRepository;
import com.elderlink.backend.repositories.RequestRepository;
import com.elderlink.backend.services.RequestService;
import com.elderlink.backend.services.RequestsHistoryService;
import com.elderlink.backend.services.UserService;
import com.elderlink.backend.utils.IsUserAuthorized;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
@Service
public class RequestsHistoryServiceImpl implements RequestsHistoryService{

    Logger logger = LoggerFactory.getLogger (RequestsHistoryService.class);

    @Autowired
    private IsUserAuthorized isUserAuthorized;

    @Autowired
    private RequestHistoryRepository requestHistoryRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RequestService requestService;

    @Autowired
    private RequestRepository requestRepository;

    @Override
    public RequestHistoryEntity createRequestHistory(RequestHistoryEntity requestHistoryEntity) {
        try {

            //To check volunteer's authority
            isUserAuthorized.checkUserAuthority(requestHistoryEntity.getVolunteer().getId());

            //can create separate module
            if(!userService.isUserExisted(requestHistoryEntity.getVolunteer().getId())){
                throw new EntityNotFoundException ("Volunteer with this id doesn't exist!");
            }

            //can create separate module
            if(!userService.isUserExisted (requestHistoryEntity.getElderPerson ().getId ())){
                throw new EntityNotFoundException ("Elder person with this id doesn't exist!");
            }

            //checking if request exist
            if(requestService.isRequestExists(requestHistoryEntity.getRequest().getId())){
                RequestEntity request = requestRepository.findById (requestHistoryEntity.getRequest ().getId ())
                        .orElseThrow (()-> new EntityNotFoundException ("Request with this id doesn't exist!"));
                if(!Objects.equals (request.getUser ().getId (), requestHistoryEntity.getElderPerson ().getId ())){
                    throw new EntityNotFoundException("Elder person id is not associated with this request!");
                }
            }
            RequestHistoryEntity requestHistory = requestHistoryRepository.save(requestHistoryEntity);
            logger.info ("RequestHistory created successfully.");
            return requestHistory;
        }catch(EntityNotFoundException e){
            logger.error ("An error occurred while creating the RequestHistory! -> {}",e.getMessage ());
            throw new EntityNotFoundException ("An error occurred while creating the requestHistory."+ e.getMessage ());
        }
    }
}
