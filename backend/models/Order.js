const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
        required: true,
    },
    trackingId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['shipped', 'in transit', 'delivered'],
        default: 'shipped',
    },
    deliveryDetails: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;