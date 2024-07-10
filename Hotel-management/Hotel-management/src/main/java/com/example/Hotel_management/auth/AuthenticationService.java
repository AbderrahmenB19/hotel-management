package com.example.Hotel_management.auth;

import com.example.Hotel_management.email.EmailService;
import com.example.Hotel_management.email.EmailTemplate;
import com.example.Hotel_management.role.RoleRepository;
import com.example.Hotel_management.security.JwtService;
import com.example.Hotel_management.user.Token;
import com.example.Hotel_management.user.TokenRepository;
import com.example.Hotel_management.user.User;
import com.example.Hotel_management.user.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import javax.naming.TimeLimitExceededException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public void registerUser(RegisterRequest registerRequest) throws MessagingException {
        var role= roleRepository.findByName("USER").orElseThrow(()-> new EntityNotFoundException("Role not found "));
        var user = User.builder()
                .email(registerRequest.email())
                .firstName(registerRequest.firstName())
                .lastName(registerRequest.lastName())
                .phoneNumber(registerRequest.phoneNumber())
                .password(passwordEncoder.encode(registerRequest.password()))
                .roles(List.of(role))
                .accountLocked(false)
                .enabled(false)
                .build();
        userRepository.save(user);
        sendEmail(user);
    }

    private void sendEmail(User user) throws MessagingException {
        var token = generateAndSaveToken(user);
        emailService.sendEmail(
                token,
                user.getName(),
                user.getUsername(),
                EmailTemplate.ACTIVATE_ACCOUNT,
                "Activation-Account",
                "ConfirmationURL"


        );

    }

    private String generateAndSaveToken(User user) {
        var token= generateActivationToken(6);
        var saveToken= Token.builder()
                .user(user)
                .token(token)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(30))
                .build();
        tokenRepository.save(saveToken);
        return token;

    }

    private String generateActivationToken(int lenght) {
        final String numbers= "0123456789";
        StringBuilder stringBuilder= new StringBuilder();
        SecureRandom random= new SecureRandom();
        for(int i = 0; i< lenght;i++){
            int randomIndex= random.nextInt(numbers.length());
            stringBuilder.append(numbers.charAt(randomIndex));

        }
        return stringBuilder.toString();

    }

    public void activateAccount(String token) throws MessagingException {
        Token token_repo= tokenRepository.findByToken(token).orElseThrow(()->new EntityNotFoundException("token not found "));
        if(token_repo.getExpiresAt().isBefore(LocalDateTime.now())){
            sendEmail(token_repo.getUser());
            throw new RuntimeException("time limited exception");

        }
        token_repo.setValidatedAt(LocalDateTime.now());
        User user =token_repo.getUser();
        user.setEnabled(true);
        userRepository.save(user);
        tokenRepository.save(token_repo);

    }

    public LoginResponse login(LoginRequest loginRequest) {


        var auth= authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email(),loginRequest.password())

        );
        var claims = new HashMap<String,Object>();
        var user = (User) auth.getPrincipal();
        log.info("stage 4545454",user.getUsername());
        claims.put("fullname",user.getFullName());
        var jwtToken= jwtService.generateToken((User) auth.getPrincipal(),claims);
        return LoginResponse.builder()
                .token(jwtToken)
                .build();

    }
}
