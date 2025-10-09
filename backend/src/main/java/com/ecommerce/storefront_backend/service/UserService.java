package com.ecommerce.storefront_backend.service;

import com.ecommerce.storefront_backend.model.User;
import com.ecommerce.storefront_backend.repository.UserRepository;
import com.ecommerce.storefront_backend.dto.SignupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    // Create new user
    public User createUser(SignupRequest signupRequest) {
        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setFirstName(signupRequest.getFirstName());
        user.setLastName(signupRequest.getLastName());
        user.setPhoneNumber(signupRequest.getPhoneNumber());
        
        return userRepository.save(user);
    }
    
    // Find user by username or email
    public Optional<User> findByUsernameOrEmail(String usernameOrEmail) {
        return userRepository.findByUsernameOrEmail(usernameOrEmail);
    }
    
    // Find user by username
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    // Find user by email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    // Find user by ID
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }
    
    // Check if username exists
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    // Check if email exists
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    // Update user profile
    public User updateUser(User user) {
        user.updateTimestamp();
        return userRepository.save(user);
    }
    
    // Update last login time
    public void updateLastLogin(User user) {
        user.recordLogin();
        userRepository.save(user);
    }
    
    // Get all users (admin function)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    // Get users by role
    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }
    
    // Enable/disable user account
    public User toggleUserEnabled(String userId, boolean enabled) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setEnabled(enabled);
            user.updateTimestamp();
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found with id: " + userId);
    }
    
    // Add role to user
    public User addRoleToUser(String userId, String role) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.addRole(role);
            user.updateTimestamp();
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found with id: " + userId);
    }
    
    // Remove role from user
    public User removeRoleFromUser(String userId, String role) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.removeRole(role);
            user.updateTimestamp();
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found with id: " + userId);
    }
    
    // Delete user
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }
    
    // Get user count
    public long getUserCount() {
        return userRepository.count();
    }
    
    // Get users created after specific date
    public List<User> getUsersCreatedAfter(LocalDateTime date) {
        return userRepository.findUsersCreatedAfter(date);
    }
}
