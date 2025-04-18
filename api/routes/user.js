// Import required dependencies
const express = require('express');              // Import Express.js framework
const router = express.Router();                 // Create router instance
const UserController = require('../controllers/user');    // Import user controller methods
const checkAuth = require('../middleware/check-auth');    // Import JWT auth middleware

// User Authentication Routes
router.post('/signup', UserController.signup);   
// POST /user/signup
// Purpose: Register new user
// Access: Public
// Request body: { email: String, password: String }
// Returns: Created user details and success message
// Example: POST /user/signup with { "email": "user@example.com", "password": "securepass123" }

router.post('/login', UserController.login);     
// POST /user/login
// Purpose: Authenticate user and get JWT token
// Access: Public
// Request body: { email: String, password: String }
// Returns: JWT token for authenticated requests
// Example: POST /user/login with { "email": "user@example.com", "password": "securepass123" }

router.delete('/:userId', checkAuth, UserController.deleteUser);  
// DELETE /user/:userId
// Purpose: Remove user account
// Access: Private - Requires valid JWT token
// URL params: userId (required)
// Headers: Authorization: Bearer <token>
// Returns: Success/failure message
// Example: DELETE /user/123456 with Authorization header

// Export router for use in main application
module.exports = router;

/*
 * Authentication Details:
 * - JWT token is required for protected routes
 * - Token format: Authorization: Bearer <token>
 * - Token expiration: 24 hours
 * 
 * Error Responses:
 * - 400: Bad Request (Invalid input)
 * - 401: Unauthorized (Invalid credentials/token)
 * - 409: Conflict (Email already exists)
 * - 500: Server Error
 *
 * Success Responses:
 * - 201: Successful signup
 * - 200: Successful login/deletion
 */