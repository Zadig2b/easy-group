package com.base.service;

import com.base.dto.*;
import com.base.entity.User;
import com.base.repository.UserRepository;
import com.base.util.JwtUtils;
import com.base.service.MailService;

import java.time.Instant;
import java.time.LocalDate;

import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final MailService mailService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email déjà utilisé");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .createdAt(Instant.now())
                .cguDate(LocalDate.now())
                .build();

        userRepository.save(user);

        String token = jwtUtils.generateToken(user.getEmail());
        mailService.sendActivationEmail(user, token);
        return new AuthResponse("Registration successful. Please check your email.");
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        if (!user.isActivated()) {
            throw new RuntimeException("Compte non activé");
        }

        String token = jwtUtils.generateToken(user.getEmail());
        return new AuthResponse(token);
    }

    public void confirmAccount(String token) {
        if (!jwtUtils.validateToken(token)) {
            throw new RuntimeException("Token invalide");
        }
        String email = jwtUtils.getEmailFromToken(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        user.setActivated(true);
        userRepository.save(user);
    }
}
