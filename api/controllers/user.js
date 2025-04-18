const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Signup
exports.signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(existingUsers => {
            if (existingUsers.length >= 1) {
                return res.status(409).json({ message: 'Email already exists' });
            }
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                });
                newUser.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User created',
                            createdUser: {
                                _id: result._id,
                                email: result.email,
                                request: {
                                    type: 'GET',
                                    url: `http://localhost:3000/user/${result._id}`
                                }
                            }
                        });
                    })
                    .catch(err => res.status(500).json({ error: err }));
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};

// User Login
exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err || !result) {
                    return res.status(401).json({ message: 'Authentication failed' });
                }
                const token = jwt.sign(
                    { email: user[0].email, userId: user[0]._id },
                    process.env.JWT_KEY,
                    { expiresIn: '24h' }
                );
                res.status(200).json({
                    message: 'Authentication successful',
                    token: token
                });
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};

// Delete User
exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .exec()
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'User deleted' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};

