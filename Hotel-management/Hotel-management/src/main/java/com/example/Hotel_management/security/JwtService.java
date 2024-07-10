package com.example.Hotel_management.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
@Slf4j
public class JwtService {
    private final long jwtExpiration= 1000 * 60 * 24 * 7;// 7  days
    private final String secretKey=" 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";


    public String extractUserEmail(String jwt ) {
        return extractClaim(jwt,Claims::getSubject);


    }
    public String generateToken(UserDetails userDetails , HashMap<String,Object> claims){
        var authorities= userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .toList();
        log.info("use",userDetails.getUsername());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+jwtExpiration))
                .claim("authorities",authorities)
                .signWith(getSignInKey())
                .compact();


    }

    private <T> T extractClaim(String jwt, Function<Claims,T> claimsResolver) {
        final Claims claims= extractAllClaims(jwt);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String jwt) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    private Key getSignInKey() {
        final byte[] key= Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(key);


    }

    public boolean tokenIsValid(String jwt, UserDetails user) {
        return (user.getUsername().equals(extractUserEmail(jwt))||extractClaim(jwt,Claims::getExpiration).before(new Date()));
    }
}
