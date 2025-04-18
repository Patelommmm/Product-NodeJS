/**
 * User Model
 * Defines the structure and validation for user accounts in the system
 */

const mongoose = require('mongoose');

/**
 * User Schema Definition
 * Specifies the fields, types and validation rules for User documents
 */
const userSchema = mongoose.Schema({
    // Unique identifier for the user
    _id: mongoose.Schema.Types.ObjectId,
    
    // User email address
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,                    // Ensures email uniqueness
        trim: true,                      // Remove whitespace
        match: [
            /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/,
            'Please provide a valid email address'
        ]
    },
    
    // User password (hashed)
    password: { 
        type: String, 
        required: [true, 'Password is required']}
}, {
    timestamps: true  // Adds createdAt and updatedAt timestamps
});

// Export the model
module.exports = mongoose.model('User', userSchema);

/*
 * Usage Example:
 * 
 * const user = new User({
 *     _id: new mongoose.Types.ObjectId(),
 *     email: "user@example.com",
 *     password: "hashedPassword123"  // Should be hashed before saving
 * });
 * 
 * Validation Rules:
 * - email: Required, unique, valid email format
 * - password: Required(stored as hash)
 * 
 * Security Notes:
 * - Password is always hashed before storage using bcrypt
 * - Email addresses are stored in lowercase
 * 
 * Methods Available:
 * - find(): Find users
 * - findById(): Find user by ID
 * - findOne(): Find one user (e.g., by email)
 * - save(): Create new user
 * - deleteOne(): Delete user
 * 
 * Timestamps:
 * - createdAt: When the user account was created
 * - updatedAt: When the user account was last modified
 */