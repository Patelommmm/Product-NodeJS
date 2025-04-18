const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

// Get all orders
exports.orders_get_all = (req, res, next) => {
    Order.find()
        .populate('product')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => ({
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/orders/${doc._id}`
                    }
                }))
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};

// Create a new order
exports.orders_create_order = (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    });

    order.save()
        .then(result => {
            res.status(201).json({
                message: 'Order created',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/orders/${result._id}`
                }
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};

// Get a single order by ID
exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    order: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders'
                    }
                });
            } else {
                res.status(404).json({ message: 'No valid entry found for provided ID' });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};

// Update an order
exports.orders_update_order = (req, res, next) => {
    const updateOps = req.body.reduce((acc, ops) => {
        acc[ops.propName] = ops.value;
        return acc;
    }, {});

    Order.updateOne({ _id: req.params.orderId }, { $set: updateOps })
        .exec()
        .then(() => {
            res.status(200).json({
                message: 'Order updated',
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/orders/${req.params.orderId}`
                }
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};

// Delete an order
exports.orders_delete_order = (req, res, next) => {
    Order.deleteOne({ _id: req.params.orderId })
        .exec()
        .then(() => {
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: { productId: 'ID', quantity: 'Number' }
                }
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};