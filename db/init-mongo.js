// MongoDB initialization script to create initial data
db = db.getSiblingDB('ecommerce_store');

// Create a collection for products and insert sample data
db.products.insertMany([
  {
    name: "Laptop",
    description: "High-performance laptop for work and gaming",
    price: 999.99,
    imageUrl: "https://via.placeholder.com/300x200/laptop",
    category: "Electronics",
    stockQuantity: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Smartphone",
    description: "Latest smartphone with advanced features",
    price: 699.99,
    imageUrl: "https://via.placeholder.com/300x200/phone",
    category: "Electronics",
    stockQuantity: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Coffee Mug",
    description: "Premium ceramic coffee mug",
    price: 15.99,
    imageUrl: "https://via.placeholder.com/300x200/mug",
    category: "Home & Kitchen",
    stockQuantity: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes for daily exercise",
    price: 89.99,
    imageUrl: "https://via.placeholder.com/300x200/shoes",
    category: "Sports",
    stockQuantity: 75,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print("Sample products inserted successfully!");
