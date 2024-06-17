const Order = require('../models/Order');

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