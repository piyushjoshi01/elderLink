package com.elderlink.backend.auth.services.impl;

import com.elderlink.backend.auth.services.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {

    private static final String SECRET_KEY="d419ce37778265923e615c226b69adbf34c3707f20fa94703bd16dfbd5f52fca";
    private static final long accessTokenExpirationTime = 1000 * 20 * 60;

    @Override
    public String extractUsername(String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);
    }

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
        return claimsResolver.apply(claims);
    }

    @Override
    public String generateToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        //If we want to put extra claims
        //claims.put("userType", userDetails.getAuthorities());
        return buildToken(claims, userDetails.getUsername());
    }

    @Override
    public String buildToken(Map<String,Object> extraClaims, String subject){
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpirationTime))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    @Override
    public boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    @Override
    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    @Override
    public Key getSigningKey() {
        byte[] KeyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(KeyBytes);
    }

}
