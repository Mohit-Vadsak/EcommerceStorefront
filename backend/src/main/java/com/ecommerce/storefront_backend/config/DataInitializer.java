package com.ecommerce.storefront_backend.config;

import com.ecommerce.storefront_backend.model.Product;
import com.ecommerce.storefront_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only add sample data if the database is empty
        if (productRepository.count() == 0) {
            System.out.println("Initializing sample data...");
            
            // Create sample products
            Product laptop = new Product(
                "Gaming Laptop",
                "High-performance laptop perfect for gaming and work",
                new BigDecimal("999.99"),
                "https://via.placeholder.com/300x200/laptop",
                "Electronics",
                25
            );
            
            Product smartphone = new Product(
                "Smartphone Pro",
                "Latest smartphone with advanced camera and features",
                new BigDecimal("699.99"),
                "https://via.placeholder.com/300x200/phone",
                "Electronics",
                50
            );
            
            Product coffeeMug = new Product(
                "Premium Coffee Mug",
                "Elegant ceramic coffee mug for your morning brew",
                new BigDecimal("15.99"),
                "https://via.placeholder.com/300x200/mug",
                "Home & Kitchen",
                100
            );
            
            Product runningShoes = new Product(
                "Running Shoes",
                "Comfortable running shoes for daily exercise",
                new BigDecimal("89.99"),
                "https://via.placeholder.com/300x200/shoes",
                "Sports",
                40
            );
            
            Product backpack = new Product(
                "Travel Backpack",
                "Durable backpack perfect for travel and hiking",
                new BigDecimal("59.99"),
                "https://via.placeholder.com/300x200/backpack",
                "Travel",
                30
            );
            
            // Save products to database
            productRepository.save(laptop);
            productRepository.save(smartphone);
            productRepository.save(coffeeMug);
            productRepository.save(runningShoes);
            productRepository.save(backpack);
            
            System.out.println("Sample data initialized successfully! Added " + productRepository.count() + " products.");
        } else {
            System.out.println("Database already contains " + productRepository.count() + " products. Skipping initialization.");
        }
    }
}
