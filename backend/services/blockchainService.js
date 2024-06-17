const { Web3 } = require('web3');
const config = require('../config/config');

// Initialize Web3
const web3 = new Web3(config.blockchainProvider);

// Smart contract ABI and address
const invoiceABI = require('../build/contracts/Invoice.json').abi;
const invoiceAddress = config.invoiceContractAddress;

const escrowABI = require('../build/contracts/Escrow.json').abi;
const escrowAddress = config.escrowContractAddress;

// Create contract instances
const invoiceContract = new web3.eth.Contract(invoiceABI, invoiceAddress);
const escrowContract = new web3.eth.Contract(escrowABI, escrowAddress);

// Function to create invoice on the blockchain
exports.createInvoiceOnBlockchain = async (invoice) => {
    try {
        const accounts = await web3.eth.getAccounts();
        await invoiceContract.methods.createInvoice(invoice.invoiceNumber, invoice.amount, invoice.buyerWalletAddress, invoice.sellerWalletAddress)
            .send({ from: accounts[0], gas: 3000000, gasPrice: web3.utils.toWei('20', 'gwei') });
        console.log('Invoice created on blockchain');
    } catch (error) {
        console.error('Error creating invoice on blockchain', error);
    }
};

// Function to move funds to escrow
exports.moveToEscrow = async (invoice) => {
    try {
        const accounts = await web3.eth.getAccounts();
        await escrowContract.methods.depositFunds(invoice.invoiceNumber, invoice.buyerWalletAddress, invoice.sellerWalletAddress)
            .send({ from: accounts[0], gas: 3000000, gasPrice: web3.utils.toWei('20', 'gwei'), value: web3.utils.toWei(invoice.amount.toString(), 'ether') });
        console.log('Funds moved to escrow');
    } catch (error) {
        console.error('Error moving funds to escrow', error);
    }
};

// Function to release funds from escrow
exports.releaseFunds = async (invoice) => {
    try {
        const accounts = await web3.eth.getAccounts();
        await escrowContract.methods.releaseFunds(invoice.invoiceNumber)
            .send({ from: accounts[0], gas: 3000000, gasPrice: web3.utils.toWei('20', 'gwei') });
        console.log('Funds released from escrow');
    } catch (error) {
        console.error('Error releasing funds from escrow', error);
    }
};
