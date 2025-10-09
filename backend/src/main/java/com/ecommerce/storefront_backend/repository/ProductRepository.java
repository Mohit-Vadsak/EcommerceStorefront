package com.ecommerce.storefront_backend.repository;

import com.ecommerce.storefront_backend.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    
    // Find products by category
    List<Product> findByCategory(String category);
    
    // Find products by name containing (case insensitive)
    List<Product> findByNameContainingIgnoreCase(String name);
    
    // Find products by price range
    @Query("{'price': {$gte: ?0, $lte: ?1}}")
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
    
    // Find products in stock
    List<Product> findByStockQuantityGreaterThan(Integer quantity);
    
    // Find products by category and in stock
    List<Product> findByCategoryAndStockQuantityGreaterThan(String category, Integer quantity);
}
