const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    blockchainProvider: process.env.BLOCKCHAIN_PROVIDER,
    invoiceContractAddress: process.env.INVOICE_CONTRACT_ADDRESS,
    escrowContractAddress: process.env.ESCROW_CONTRACT_ADDRESS,
}