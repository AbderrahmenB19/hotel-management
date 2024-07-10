package com.example.Hotel_management.security;

import com.example.Hotel_management.user.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@RequiredArgsConstructor
@Component
@Slf4j
public class JwtFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsServices userDetailsServices;
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        log.info("yahooooooooooooooooooooooooooo");
        if(request.getServletPath().contains("/api/v1/auth")){
            log.info("sssssssssssss",request.getServletPath());
            filterChain.doFilter(request,response);
            return;
        }
        String Authorization = request.getHeader("Authorization");
        String jwt ;
        String userEmail;
        log.info("stage 2");
        if(Authorization==null||!Authorization.startsWith("Bearer") ){
            filterChain.doFilter(request,response);
            log.info("stage 3");
            return;


        }
        log.info("stage 4");
        jwt = Authorization.substring(7);
        userEmail=jwtService.extractUserEmail(jwt);
        log.info(userEmail);
        log.info(""+SecurityContextHolder.getContext().getAuthentication());
        if(userEmail!=null && SecurityContextHolder.getContext().getAuthentication()==null){
            log.info("stage 5");
            UserDetails user= userDetailsServices.loadUserByUsername(userEmail);
           if(jwtService.tokenIsValid(jwt,user)){
               log.info("stage 6");
               UsernamePasswordAuthenticationToken auth =new UsernamePasswordAuthenticationToken(user, null,user.getAuthorities());
               auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
               SecurityContextHolder.getContext().setAuthentication(auth);
           }
            log.info("stage 7");


        }
        log.info("stage 8");
        filterChain.doFilter(request, response);

    }

}
