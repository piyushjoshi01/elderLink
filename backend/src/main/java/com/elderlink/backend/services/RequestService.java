package com.elderlink.backend.services;

import com.elderlink.backend.domains.entities.RequestEntity;

import java.util.List;

public interface RequestService {
    public RequestEntity createRequest(RequestEntity requestEntity);

    public List<RequestEntity> findRequestsByUserId(Long userId);

    public RequestEntity updateRequest(Long id, RequestEntity requestEntity);

    public void deleteRequest(Long id);
}
