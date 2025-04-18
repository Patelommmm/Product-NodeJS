<<<<<<< HEAD
# Product-NodeJS
=======
# Node.js RESTful API Project Guide

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Running the Project](#running-the-project)
- [Testing](#testing)

## Overview
A RESTful API built with Node.js, Express, and MongoDB featuring:
- 🔐 User Authentication (JWT)
- 📦 Product Management
- 🛒 Order Management
- 🔒 Protected Routes

## Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- npm v6+ (comes with Node.js)
- MongoDB v4+ ([Download](https://www.mongodb.com/try/download/community))

## Project Setup
```bash
# Create project directory
mkdir NodeJsProjects
cd NodeJsProjects
mkdir Learning
cd Learning

# Initialize project
npm init -y

# Install dependencies
npm install express mongoose bcrypt jsonwebtoken dotenv morgan body-parser
npm install --save-dev nodemon
```

## Project Structure
```
Learning/
├── api/
│   ├── controllers/
│   │   ├── user.js      # User authentication logic
│   │   ├── products.js  # Product management
│   │   └── orders.js    # Order processing
│   ├── middleware/
│   │   └── check-auth.js
│   ├── models/
│   │   ├── user.js
│   │   ├── product.js
│   │   └── order.js
│   └── routes/
│       ├── user.js
│       ├── products.js
│       └── orders.js
├── app.js
├── server.js
├── package.json
├── nodemon.json
└── .env
```

## Configuration
### Environment Variables (.env)
```env
PORT=3000
MONGO_ATLAS_PW=admin
JWT_KEY=secret
```

### Nodemon Config (nodemon.json)
```json
{
    "env": {
        "MONGO_ATLAS_PW": "admin",
        "JWT_KEY": "secret"
    }
}
```

## API Endpoints

### User Routes
```http
POST   /user/signup   # Create new user
POST   /user/login    # Authenticate user
DELETE /user/:userId  # Delete user
```

### Product Routes
```http
GET    /products      # List all products
POST   /products      # Create product (Auth required)
GET    /products/:id  # Get single product
PATCH  /products/:id  # Update product (Auth required)
DELETE /products/:id  # Delete product (Auth required)
```

### Order Routes
```http
GET    /orders        # List all orders (Auth required)
POST   /orders        # Create order (Auth required)
GET    /orders/:id    # Get single order (Auth required)
DELETE /orders/:id    # Delete order (Auth required)
```

## Running the Project
```bash
# Start MongoDB (in a separate terminal)
mongod

# Start the application
npm start
```

## Testing
### Example API Requests

#### User Signup
```http
POST http://localhost:3000/user/signup
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "password123"
}
```

#### User Login
```http
POST http://localhost:3000/user/login
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "password123"
}
```

#### Create Product (with Authentication)
```http
POST http://localhost:3000/products
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
    "name": "Sample Product",
    "price": 49.99
}
```

## Additional Notes
- ⚠️ Never commit `.env` files to version control
- 🔑 Keep your JWT_KEY secure and unique
- 📝 Use Postman or similar tools for API testing
- ⚡ Enable CORS for cross-origin requests
- 🔄 Use proper error handling in production

## License
ISC
>>>>>>> test-branch
