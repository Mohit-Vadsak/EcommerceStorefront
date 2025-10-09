package com.ecommerce.storefront_backend.dto;

import com.ecommerce.storefront_backend.model.User;

import java.util.Set;

public class JwtResponse {
    
    private String token;
    private String type = "Bearer";
    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Set<String> roles;
    
    // Constructors
    public JwtResponse(String accessToken, String id, String username, String email, 
                      String firstName, String lastName, Set<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
    }
    
    // Static factory method to create from User
    public static JwtResponse from(String token, User user) {
        return new JwtResponse(
            token,
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getRoles()
        );
    }
    
    // Getters and Setters
    public String getAccessToken() {
        return token;
    }
    
    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }
    
    public String getTokenType() {
        return type;
    }
    
    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public Set<String> getRoles() {
        return roles;
    }
    
    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}
