const Web3 = require('web3');
const config = require('../config/config');

const web3 = new Web3(new Web3.providers.HttpProvider(config.blockchainProvider));

const contractABI = require ("../contracts/ContractABI.json");
const contractAddress = config.contractAddress;

const contract = new web3.eth.Contract(contractABI, contractAddress);

exports.createInvoiceOnBlockchain = async (invoice) => {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.creatInvoice(invoice.invoiceNumber, invoice.amount)
            .send({ from: accounts[0], gas: 3000000 });
        console.log("Invoice created on blockchain");
    } catch (error) {
        console.error('Error creating invoice on blockchain', error);
    }
};

exports.moveToEscrow = async (invoice) => {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.moveToEscrow(invoice.invoiceNumber)
            .send({ from: accounts[0], gas: 3000000, value: web3.utils.toWei(invoice.amount.toString(), 'ether') });
        console.log("Funds moved to escrow");
    } catch (error) {
        console.error('Error moving funds to escrow', error);
    }
};

exports.releaseFunds = async (invoice) => {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.releaseFunds(invoice.invoiceNumber)
            .send({ from: accounts[0], gas: 3000000 });
        console.log("Funds released to seller");
    } catch (error) {
        console.error('Error releasing funds from escrow', error);
    }
};