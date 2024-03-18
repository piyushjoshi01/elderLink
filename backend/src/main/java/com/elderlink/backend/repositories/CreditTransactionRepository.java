package com.elderlink.backend.repositories;

import com.elderlink.backend.domains.entities.CreditTransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditTransactionRepository extends JpaRepository<CreditTransactionEntity,Long>{
}
