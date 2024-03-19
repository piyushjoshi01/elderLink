package com.elderlink.backend.auth.services.impl;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collections;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceImplTest {

    private JwtServiceImpl jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtServiceImpl();
    }

    @Test
    void testGenerateToken() {
        UserDetails userDetails = new User("user@example.com", "password", Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        String token = jwtService.generateToken(userDetails);
        assertNotNull(token);
        String username = jwtService.extractUsername(token);
        assertEquals("user@example.com", username);
    }

    @Test
    void testIsTokenValid() {
        UserDetails userDetails = new User("user@example.com", "password", Collections.emptyList());
        String token = jwtService.generateToken(userDetails);
        assertTrue(jwtService.isTokenValid(token, userDetails));
    }

    @Test
    void testExtractExpiration() {
        String token = jwtService.generateToken(new User("user@example.com", "password", Collections.emptyList()));
        Date expiration = jwtService.extractExpiration(token);
        assertNotNull(expiration);
        assertTrue(expiration.after(new Date()));
    }

    @Test
    void testExtractClaim() {
        UserDetails userDetails = new User("user@example.com", "password", Collections.emptyList());
        String token = jwtService.generateToken(userDetails);
        Date issuedAt = jwtService.extractClaim(token, Claims::getIssuedAt);
        assertNotNull(issuedAt);
    }
}
