package com.base.controller;

import com.base.dto.UserDTO;
import com.base.repository.UserRepository;
import com.base.util.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Token manquant ou invalide");
        }

        String token = header.substring(7);
        String email = jwtUtils.getEmailFromToken(token);

        // On sépare le traitement
        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Utilisateur non trouvé");
        }

        return ResponseEntity.ok(new UserDTO(userOpt.get()));
    }

}
