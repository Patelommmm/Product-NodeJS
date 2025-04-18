// Import required dependencies
const express = require('express');              // Import Express framework
const router = express.Router();                 // Create Express router instance
const checkAuth = require('../middleware/check-auth');    // Import authentication middleware
const OrderController = require('../controllers/orders'); // Import order controller functions

// Define API routes for order operations
// Each route is protected by checkAuth middleware that verifies JWT token

// GET /orders - Retrieve all orders
// Protected route - requires valid JWT token
router.get('/', checkAuth, OrderController.orders_get_all);

// POST /orders - Create a new order
// Protected route - requires valid JWT token
// Expects order details in request body
router.post('/', checkAuth, OrderController.orders_create_order);

// GET /orders/:orderId - Retrieve a specific order by ID
// Protected route - requires valid JWT token
// orderId is passed as URL parameter
router.get('/:orderId', checkAuth, OrderController.orders_get_order);

// PATCH /orders/:orderId - Update an existing order
// Protected route - requires valid JWT token
// orderId is passed as URL parameter
// Expects update data in request body
router.patch('/:orderId', checkAuth, OrderController.orders_update_order);

// DELETE /orders/:orderId - Delete an existing order
// Protected route - requires valid JWT token
// orderId is passed as URL parameter
router.delete('/:orderId', checkAuth, OrderController.orders_delete_order);

// Export the router to be used in other parts of the application
module.exports = router;