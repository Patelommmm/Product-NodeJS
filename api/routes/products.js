// Import required packages and modules
const express = require('express');              // Import Express.js web framework
const router = express.Router();                 // Create a new router instance to handle routes
const checkAuth = require('../middleware/check-auth');    // Import authentication middleware to protect routes
const ProductController = require('../controllers/products'); // Import controller containing product-related logic

// Define all routes for product operations
// Public Routes (No Authentication Required):
router.get('/', ProductController.products_get_all);  
// GET /products
// Returns: List of all products with pagination
// Access: Public - No authentication needed
// Query params: page, limit (optional)
// Example: GET /products?page=1&limit=10

router.get('/:productId', ProductController.products_get_product);  
// GET /products/:productId
// Returns: Single product details
// Access: Public
// URL params: productId (required)
// Example: GET /products/123456

// Protected Routes (Requires Authentication):
router.post('/', checkAuth, ProductController.products_create_product);  
// POST /products
// Purpose: Create new product
// Access: Private - Requires valid JWT token
// Request body: { name: String, price: Number }
// Headers: Authorization: Bearer <token>
// Returns: Newly created product details

router.patch('/:productId', checkAuth, ProductController.products_update_product);  
// PATCH /products/:productId
// Purpose: Update existing product
// Access: Private - Requires valid JWT token
// URL params: productId (required)
// Request body: [{ propName: String, value: Any }]
// Example body: [{ "propName": "price", "value": 29.99 }]
// Returns: Updated product details

router.delete('/:productId', checkAuth, ProductController.products_delete_product);  
// DELETE /products/:productId
// Purpose: Remove product from database
// Access: Private - Requires valid JWT token
// URL params: productId (required)
// Returns: Success/failure message
// Note: This operation is irreversible

// Export the router to make it available for use in app.js
module.exports = router;

/*
 * Authentication Details:
 * - Protected routes require JWT token in Authorization header
 * - Format: Authorization: Bearer <token>
 * - Token obtained from /user/login endpoint
 * 
 * Error Responses:
 * - 400: Bad Request (Invalid input)
 * - 401: Unauthorized (Missing/invalid token)
 * - 404: Not Found (Product doesn't exist)
 * - 500: Server Error
 *
 * Success Responses:
 * - 200: Successful GET/PATCH
 * - 201: Successful POST
 * - 204: Successful DELETE
 */