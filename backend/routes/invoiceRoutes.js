const express = require('express');
const router = express.Router();
const { createInvoice, getInvoices, approveInvoice, markAsDelivered } = require('../controllers/invoiceController');
const { protect } = require("../controllers/authController");

router.post('/create', protect, createInvoice);
router.get('/', protect, getInvoices);
router.post('/approve', protect, approveInvoice);
router.post('/delivered', protect, markAsDelivered);

module.exports = router;