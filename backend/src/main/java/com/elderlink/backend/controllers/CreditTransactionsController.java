package com.elderlink.backend.controllers;

import com.elderlink.backend.domains.dto.CreditTransactionDto;
import com.elderlink.backend.domains.entities.CreditTransactionEntity;
import com.elderlink.backend.mappers.Mapper;
import com.elderlink.backend.services.CreditTransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transaction")
public class CreditTransactionsController {

    @Autowired
    private CreditTransactionService creditTransactionService;
    @Autowired
    private Mapper<CreditTransactionEntity, CreditTransactionDto> creditTransactionMapper;

    @PostMapping("/create")
    public ResponseEntity<CreditTransactionDto> createTransaction(
            @Valid @RequestBody CreditTransactionDto creditTransactionDto
    ){
        CreditTransactionEntity creditTransactionEntity = creditTransactionMapper.toEntity(creditTransactionDto);
        CreditTransactionEntity createdCreditTransaction = creditTransactionService.createCreditTransaction(creditTransactionEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(creditTransactionMapper.toDto(createdCreditTransaction));
    }

}
