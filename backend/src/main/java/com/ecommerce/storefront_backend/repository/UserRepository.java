package com.ecommerce.storefront_backend.repository;

import com.ecommerce.storefront_backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    // Find user by username
    Optional<User> findByUsername(String username);
    
    // Find user by email
    Optional<User> findByEmail(String email);
    
    // Find user by username or email (for login)
    @Query("{'$or': [{'username': ?0}, {'email': ?0}]}")
    Optional<User> findByUsernameOrEmail(String usernameOrEmail);
    
    // Check if username exists
    boolean existsByUsername(String username);
    
    // Check if email exists
    boolean existsByEmail(String email);
    
    // Find users by role
    @Query("{'roles': ?0}")
    List<User> findByRole(String role);
    
    // Find enabled users
    List<User> findByEnabledTrue();
    
    // Find users by first name and last name
    List<User> findByFirstNameAndLastName(String firstName, String lastName);
    
    // Find users by city
    List<User> findByCity(String city);
    
    // Find users created after a certain date
    @Query("{'createdAt': {'$gte': ?0}}")
    List<User> findUsersCreatedAfter(java.time.LocalDateTime date);
    
    // Count users by role
    @Query(value = "{'roles': ?0}", count = true)
    long countByRole(String role);
}
