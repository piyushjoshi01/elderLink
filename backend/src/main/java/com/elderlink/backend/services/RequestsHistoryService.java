package com.elderlink.backend.services;

import com.elderlink.backend.domains.entities.RequestHistoryEntity;

import java.util.List;

public interface RequestsHistoryService{

    public RequestHistoryEntity createRequestHistory(RequestHistoryEntity requestHistoryEntity);

    public List<RequestHistoryEntity> getRequestHistoriesByRequestId(Long requestId);

    public List<RequestHistoryEntity> getRequestHistoriesByElderPersonId(Long elderPersonId);
}
