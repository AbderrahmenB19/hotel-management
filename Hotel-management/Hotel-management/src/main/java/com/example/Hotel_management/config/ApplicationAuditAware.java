package com.example.Hotel_management.config;

import com.example.Hotel_management.user.User;
import com.example.Hotel_management.user.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;




public class ApplicationAuditAware implements AuditorAware<Integer> {

    @Override
    public Optional getCurrentAuditor() {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if(authentication==null|| !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken){
            return Optional.empty();
        }
        User user= (User)authentication.getPrincipal();
        return Optional.ofNullable(user);
    }
}
