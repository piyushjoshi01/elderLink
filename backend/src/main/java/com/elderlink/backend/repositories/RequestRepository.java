package com.elderlink.backend.repositories;

import com.elderlink.backend.domains.entities.RequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<RequestEntity,Long> {

}
