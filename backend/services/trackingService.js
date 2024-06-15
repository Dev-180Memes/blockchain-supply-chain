const Order = require('../models/Order');

exports.generateTrackingId = async () => {
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    if (lastOrder) {
        const lastNumber = parseInt(lastOrder.trackingId.split("-")[1], 10);
        return `TRACK-${lastNumber + 1}`;
    }
    return "TRACK-1001";
};

exports.updateOrderStatus = async (orderId, status) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        order.status = status;
        await order.save();
        console.log("Order status updated");
        return order;
    } catch (error) {
        console.error("Error updating order status", error);
    }
};