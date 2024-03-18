package com.elderlink.backend.services.impl;

import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class CreditTransactionImplTest{

    @Mock
    private UserRepository userRepository;
    @Mock
    private UserService userService;

    @Mock
    private CreditTransactionRepository creditTransactionRepository;

    @Mock
    private IsUserAuthorized isUserAuthorized;

    @InjectMocks
    private CreditTransactionImpl creditTransactionService;

    private UserEntity sender;
    private CreditTransactionEntity creditTransactionEntity;
    private UserEntity recipient;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks (this);

        sender = mock(UserEntity.class);

        recipient = mock(UserEntity.class);

        creditTransactionEntity = mock (CreditTransactionEntity.class);
        when (creditTransactionEntity.getSender ()).thenReturn (sender);
        when(creditTransactionEntity.getRecipient ()).thenReturn (recipient);
    }

    @Test
    public void testCreateCreditTransactionSufficientBalance() {

        when(userService.getUserById (anyLong ())).thenReturn (Optional.of (sender));
        when(userRepository.findById (anyLong ())).thenReturn (Optional.of (sender));

        when(creditTransactionEntity.getSender ().getId ()).thenReturn (1L);
        when(creditTransactionEntity.getRecipient ().getId ()).thenReturn (2L);

        doNothing().when(isUserAuthorized).checkUserAuthority(anyLong());

        when(sender.getCreditBalance ()).thenReturn (BigDecimal.valueOf (500));
        when(creditTransactionEntity.getHoursCredited ()).thenReturn (BigDecimal.valueOf (20));
        when(recipient.getCreditBalance ()).thenReturn (BigDecimal.valueOf (20));

        creditTransactionService.createCreditTransaction(creditTransactionEntity);

        assertEquals(BigDecimal.valueOf(500), sender.getCreditBalance());
        assertEquals(BigDecimal.valueOf (20), recipient.getCreditBalance());
    }

    @Test
    public void testCreateCreditTransactionInSufficientBalance() {

        when(userService.getUserById (anyLong ())).thenReturn (Optional.of (sender));
        when(userRepository.findById (anyLong ())).thenReturn (Optional.of (sender));

        when(creditTransactionEntity.getSender ().getId ()).thenReturn (1L);
        when(creditTransactionEntity.getRecipient ().getId ()).thenReturn (2L);

        doNothing().when(isUserAuthorized).checkUserAuthority(anyLong());

        when(sender.getCreditBalance ()).thenReturn (BigDecimal.valueOf (20));
        when(creditTransactionEntity.getHoursCredited ()).thenReturn (BigDecimal.valueOf (500));

        assertThrows (RuntimeException.class,()-> creditTransactionService.createCreditTransaction (creditTransactionEntity));
    }

    @Test
    public void testCreateCreditTransactionUserNotFound() {

        when(userService.getUserById (anyLong ())).thenReturn (Optional.empty ());

        doNothing().when(isUserAuthorized).checkUserAuthority(anyLong());

        assertThrows (EntityNotFoundException.class,()-> creditTransactionService.createCreditTransaction (creditTransactionEntity));
    }

}
