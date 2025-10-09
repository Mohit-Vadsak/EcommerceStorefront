package com.ecommerce.storefront_backend.controller;

import com.ecommerce.storefront_backend.dto.*;
import com.ecommerce.storefront_backend.model.User;
import com.ecommerce.storefront_backend.security.JwtUtils;
import com.ecommerce.storefront_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsernameOrEmail(),
                    loginRequest.getPassword()
                )
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            // Get user details
            Optional<User> userOpt = userService.findByUsernameOrEmail(loginRequest.getUsernameOrEmail());
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(MessageResponse.error("User not found"));
            }
            
            User user = userOpt.get();
            
            // Update last login
            userService.updateLastLogin(user);
            
            // Generate JWT token
            String jwt = jwtUtils.generateJwtToken(user.getUsername(), user.getId(), user.getRoles());
            
            return ResponseEntity.ok(JwtResponse.from(jwt, user));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(MessageResponse.error("Invalid username/email or password"));
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody SignupRequest signupRequest) {
        // Check if username already exists
        if (userService.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest()
                .body(MessageResponse.error("Username is already taken"));
        }
        
        // Check if email already exists
        if (userService.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest()
                .body(MessageResponse.error("Email is already in use"));
        }
        
        try {
            // Create new user
            User user = userService.createUser(signupRequest);
            
            // Generate JWT token for immediate login
            String jwt = jwtUtils.generateJwtToken(user.getUsername(), user.getId(), user.getRoles());
            
            return ResponseEntity.ok(JwtResponse.from(jwt, user));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(MessageResponse.error("Failed to create user: " + e.getMessage()));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(MessageResponse.success("User logged out successfully"));
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.badRequest()
                .body(MessageResponse.error("User not authenticated"));
        }
        
        String username = authentication.getName();
        Optional<User> userOpt = userService.findByUsername(username);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                .body(MessageResponse.error("User not found"));
        }
        
        User user = userOpt.get();
        // Return user info without password
        return ResponseEntity.ok(new UserInfoResponse(user));
    }
}
