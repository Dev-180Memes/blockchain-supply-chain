const Invoice = require("../models/Invoice");
const User = require("../models/User");
// TODO: Import blockchain service

const generateInvoiceNumber = async () => {
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
    if (lastInvoice) {
        const lastNumber = parseInt(lastInvoice.invoiceNumber.split("-")[1], 10);
        return `INV-${lastNumber + 1}`;
    }
    return "INV-1001";
};

exports.createInvoice = async (req, res) => {
    const { buyerId, amount, productDetails } = req.body;
    const sellerId = req.user;

    try {
        const buyer = await User.findById(buyerId);
        if (!buyer || buyer.role !== "buyer") {
            return res.status(400).json({ message: "Invalid buyer" });
        }

        const invoiceNumber = await generateInvoiceNumber();

        const invoice = new Invoice({
            invoiceNumber,
            buyer: buyerId,
            seller: sellerId,
            amount,
            productDetails,
            status: "pending",
        });

        await invoice.save();

        // TODO: Create invoice on blockchain

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

        invoice.status = "approved";
        await invoice.save();

        // TODO: Update invoice status on blockchain and move funds to escrow

        res.status(200).json({ message: "Invoice approved successfully", invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.markAsDelivered = async (req, res) => {
    const { invoiceId } = req.body;
    const userId = req.user;

    try {
        const invoice = await Invoice.findById(invoiceId);

        if (!invoice || invoice.buyer.toString() !== userId) {
            return res.status(400).json({ message: "Invalid invoice or unauthorized" });
        }

        invoice.status = "delivered";
        await invoice.save();

        // TODO: Update invoice status on blockchain and release funds to seller

        res.status(200).json({ message: "Invoice marked as delivered successfully", invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};