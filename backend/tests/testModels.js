const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Invoice = require('../models/Invoice');
const Order = require('../models/Order');

// Load environment variables
dotenv.config();

// Connect to the database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected');

    // Create sample user
    const user = new User({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'buyer',
    });

    user.save().then((savedUser) => {
        console.log('User saved:', savedUser);

        // Create sample invoice
        const invoice = new Invoice({
            invoiceNumber: 'INV001',
            buyer: savedUser._id,
            seller: savedUser._id, // For testing, using the same user as buyer and seller
            amount: 1000,
            productDetails: 'Sample product',
        });

        invoice.save().then((savedInvoice) => {
            console.log('Invoice saved:', savedInvoice);

            // Create sample order
            const order = new Order({
                orderId: 'ORD001',
                invoice: savedInvoice._id,
                trackingId: 'TRACK001',
                deliveryDetails: 'Sample delivery details',
            });

            order.save().then((savedOrder) => {
                console.log('Order saved:', savedOrder);
                mongoose.connection.close();
            }).catch((err) => console.error('Error saving order:', err));
        }).catch((err) => console.error('Error saving invoice:', err));
    }).catch((err) => console.error('Error saving user:', err));
}).catch((err) => console.error('Error connecting to MongoDB:', err));
