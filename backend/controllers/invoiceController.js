const Invoice = require("../models/Invoice");
const User = require("../models/User");
const Order = require("../models/Order");
// TODO: Import blockchain service
const trackingService = require("../services/trackingService");
const blockchainService = require("../services/blockchainService");

const generateInvoiceNumber = async () => {
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
    if (lastInvoice) {
        const lastNumber = parseInt(lastInvoice.invoiceNumber.split("-")[1], 10);
        return `INV-${lastNumber + 1}`;
    }
    return "INV-1001";
};

const changeString = (inputString) => {
    const splitString = inputString.toString().split("-");
    return `TRK-${splitString[1]}`;
}

exports.createInvoice = async (req, res) => {
    const { buyerId, amount, productDetails } = req.body;
    const sellerId = req.user;

    try {
        const buyer = await User.findById(buyerId);
        if (!buyer || buyer.role !== "buyer") {
            return res.status(400).json({ message: "Invalid buyer" });
        }

        const seller = await User.findById(sellerId);
        if (!seller || seller.role !== 'seller') {
            return res.status(400).json({ message: 'Invalid seller' });
        }

        const invoiceNumber = await generateInvoiceNumber();

        const invoice = new Invoice({
            invoiceNumber,
            buyer: buyerId,
            seller: sellerId,
            buyerWalletAddress: buyer.walletAddress,
            sellerWalletAddress: seller.walletAddress,
            amount,
            productDetails,
            status: "pending",
        });

        await invoice.save();

        // TODO: Create invoice on blockchain
        await blockchainService.createInvoiceOnBlockchain(invoice);

        res.status(201).json({ message: "Invoice created successfully", invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getInvoices = async (req, res) => {
    const userId = req.user;

    try {
        const invoices = await Invoice.find({
            $or: [{ buyer: userId }, { seller: userId }]
        }).populate('buyer seller');
        
        res.status(200).json({ invoices });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.approveInvoice = async (req, res) => {
    const { invoiceId } = req.body;
    const userId = req.user;

    try {
        const invoice = await Invoice.findById(invoiceId);

        if (!invoice || invoice.buyer.toString() !== userId) {
            return res.status(400).json({ message: "Invalid invoice or unauthorized" });
        }

        // Take invoice id and change it to a tracking id
        const trackingId = changeString(invoice.invoiceNumber);

        const order = new Order({
            orderId: invoice._id,
            invoice: invoice._id,
            trackingId,
            status: "shipped",
            deliveryDetails: "Order is being processed",
        });

        await order.save();

        invoice.status = "approved";
        await invoice.save();

        // TODO: Update invoice status on blockchain and move funds to escrow
        await blockchainService.moveToEscrow(invoice);

        res.status(200).json({ message: "Invoice approved successfully", invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.markAsDelivered = async (req, res) => {
    const { orderId } = req.body;
    const userId = req.user;

    try {
        const order = await Order.findById(orderId).populate("invoice");

        if (!order || order.invoice.buyer.toString() !== userId) {
            return res.status(400).json({ message: "Invalid order or unauthorized" });
        }

        order.status = "delivered";
        await order.save();

        const invoice = order.invoice;
        invoice.status = "delivered";
        await invoice.save();

        // TODO: Update invoice status on blockchain and release funds to seller
        await blockchainService.releaseFunds(invoice);

        res.status(200).json({ message: "Order marked as delivered", invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.markInTransit = async (req, res) => {
    const { orderId } = req.body;
    const userId = req.user;

    try {
        const order = await Order.findById(orderId).populate("invoice");

        if (!order || order.invoice.seller.toString() !== userId) {
            return res.status(400).json({ message: "Invalid order or unauthorized" });
        }

        order.status = "in transit";
        await order.save();

        res.status(200).json({ message: "Order status updated to in transit", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.getOrders = async (req, res) => {
    const userId = req.user;

    try {
        // Fetch all orders
        const allOrders = await Order.find().populate("invoice");

        // Filter orders where user is either buyer or seller
        const orders = allOrders.filter(order => order.invoice.buyer.toString() === userId || order.invoice.seller.toString() === userId);

        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}