package com.elderlink.backend.controllers;

import com.elderlink.backend.domains.dto.BeneficiaryDto;
import com.elderlink.backend.domains.entities.BeneficiaryEntity;
import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.mappers.Mapper;
import com.elderlink.backend.services.BeneficiaryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@ExtendWith(MockitoExtension.class)
class BeneficiaryControllerTest {

    private MockMvc mockMvc;

    @Mock
    private BeneficiaryService beneficiaryService;

    @Mock
    private Mapper<BeneficiaryEntity, BeneficiaryDto> beneficiaryMapper;

    @InjectMocks
    private BeneficiaryController beneficiaryController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(beneficiaryController).build();
    }

    @Test
    void createTransaction_Returns201OnSuccess() throws Exception {
        // Setup DTO and Entity for testing
        BeneficiaryDto requestDto = new BeneficiaryDto(null, 1L, 2L, new BigDecimal("10"), null);
        BeneficiaryEntity beneficiaryEntity = new BeneficiaryEntity(1L, new UserEntity(), new UserEntity(), new BigDecimal("10"), LocalDateTime.now());
        BeneficiaryDto responseDto = new BeneficiaryDto(1L, 1L, 2L, new BigDecimal("10"), LocalDateTime.now());

        // Mocking service and mapper behavior
        when(beneficiaryMapper.toEntity(any(BeneficiaryDto.class))).thenReturn(beneficiaryEntity);
        when(beneficiaryService.createBeneficiary(any(BeneficiaryEntity.class))).thenReturn(beneficiaryEntity);
        when(beneficiaryMapper.toDto(any(BeneficiaryEntity.class))).thenReturn(responseDto);

        // Execute and Assert
        mockMvc.perform(post("/api/beneficiary/create")
                        .contentType(APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestDto)))
                .andExpect(status().isCreated());
    }
}
