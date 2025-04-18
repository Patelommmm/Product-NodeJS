/**
 * Product Model
 * Defines the structure and validation for products in the system
 */

// Import MongoDB object modeling tool
const mongoose = require('mongoose');

/**
 * Product Schema Definition
 * Specifies the fields, types and validation rules for Product documents
 */
const productSchema = mongoose.Schema({
    // Unique identifier for the product
    _id: mongoose.Schema.Types.ObjectId,
    
    // Product name
    name: { 
        type: String, 
        required: [true, 'Product name is required'],
        trim: true,                    // Remove whitespace
        minlength: [2, 'Name too short'],
        maxlength: [100, 'Name too long']
    },
    
    // Product price
    price: { 
        type: Number, 
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
        get: v => Math.round(v * 100) / 100  // Round to 2 decimal places
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt timestamps
});

// Export the model
module.exports = mongoose.model('Product', productSchema);

/*
 * Usage Example:
 * 
 * const product = new Product({
 *     _id: new mongoose.Types.ObjectId(),
 *     name: "Sample Product",
 *     price: 99.99
 * });
 * 
 * Validation Rules:
 * - name: Required, 2-100 characters
 * - price: Required, non-negative number
 * 
 * Methods Available:
 * - find(): Find products
 * - findById(): Find product by ID
 * - save(): Create new product
 * - updateOne(): Update product
 * - deleteOne(): Delete product
 * 
 * Timestamps:
 * - createdAt: When the product was created
 * - updatedAt: When the product was last modified
 */