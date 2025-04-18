// Import required dependencies
const express = require('express');              // Express web framework
const app = express();                          // Create Express application
const morgan = require('morgan');               // HTTP request logger middleware
const bodyParser = require('body-parser');      // Parse incoming request bodies
const mongoose = require('mongoose');           // MongoDB object modeling tool

// Import route handlers
const productRouters = require('./api/routes/products');
const orderRouters = require('./api/routes/orders');
const userRouters = require('./api/routes/user');

// MongoDB Connection
// Connect to MongoDB Atlas cluster using environment variables for security
mongoose.connect('mongodb+srv://admin:'+ 
    process.env.MONGO_ATLAS_PW +
    '@omclusterforlearning.du4qd.mongodb.net/'
    ,{})
    .then(() => {
        console.log('Connected to MongoDB ');
    })
    .catch(err => {
        console.error('Connection failed:', err);
    });

// Middleware Setup
app.use(morgan('dev'));                        // Log HTTP requests
app.use(bodyParser.urlencoded({                // Parse URL-encoded bodies
    extended: false 
}));
app.use(bodyParser.json());                    // Parse JSON bodies

// CORS Middleware
// Handle Cross-Origin Resource Sharing
app.use((req, res, next) => {
    // Allow requests from any origin
    res.header("Access-Control-Allow-Origin", "*");
    
    // Allow specific headers
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    // Handle OPTIONS request method
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }

    next(); // Pass request to next middleware
});

// API Routes
// Mount route handlers at their respective endpoints
app.use('/products', productRouters);          // Product-related routes
app.use('/orders', orderRouters);              // Order-related routes
app.use('/user', userRouters);                 // User authentication routes

// Error Handling Middleware
// Handle 404 Not Found
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Handle All Other Errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);           // Use error status or 500 if not set
    res.json({
        error: {
            message: error.message
        }
    });
});

// Export the configured Express application
module.exports = app;

/*
 * Application Configuration Details:
 * 
 * Middleware Stack:
 * 1. Morgan - HTTP request logging
 * 2. Body Parser - Request body parsing
 * 3. CORS - Cross-origin resource sharing
 * 4. Route Handlers - API endpoints
 * 5. Error Handlers - 404 and general errors
 * 
 * Available Routes:
 * - /products: Product management
 * - /orders: Order management
 * - /user: User authentication
 * 
 * Error Responses:
 * - 404: Route not found
 * - 500: Internal server error
 * 
 * Environment Variables Required:
 * - MONGO_ATLAS_PW: MongoDB Atlas password
 */