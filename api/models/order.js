// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');

/**
 * Order Schema Definition
 * Defines the structure of Order documents in MongoDB
 * 
 * Fields:
 * - _id: Unique identifier for each order
 * - product: Reference to the Product model
 * - quantity: Number of products ordered (defaults to 1)
 * 
 * Relationships:
 * - One-to-One with Product model via product field
 */
const orderSchema = mongoose.Schema({
    // Unique identifier for the order
    _id: mongoose.Schema.Types.ObjectId,
    
    // Reference to the Product model
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',           // References the Product model
        required: true           // Product ID is required
    },
    
    // Quantity of products ordered
    quantity: { 
        type: Number,            // Number type for quantity
        default: 1,             // Default quantity is 1
        min: [1, 'Quantity cannot be less than 1'],  // Minimum quantity validation
        required: true          // Quantity is required
    }
}, {
    timestamps: true            // Adds createdAt and updatedAt timestamps
});

// Export the model
module.exports = mongoose.model('Order', orderSchema);

/*
 * Usage Example:
 * 
 * const order = new Order({
 *     _id: new mongoose.Types.ObjectId(),
 *     product: "productId",
 *     quantity: 2
 * });
 * 
 * Validation Rules:
 * - product: Must be a valid MongoDB ObjectId
 * - quantity: Must be a number >= 1
 * 
 * Methods Available:
 * - find(): Find orders
 * - findById(): Find order by ID
 * - save(): Create new order
 * - updateOne(): Update order
 * - deleteOne(): Delete order
 */