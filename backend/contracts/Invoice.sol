// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Invoice {
    struct InvoiceDetail {
        string invoiceNumber;
        uint256 amount;
        address payable buyer;
        address payable seller;
        bool isPaid;
        bool isDelivered;
    }

    mapping(string => InvoiceDetail) public invoices;

    event InvoiceCreated(string invoiceNumber, uint256 amount, address buyer, address seller);
    event InvoicePaid(string invoiceNumber);
    event InvoiceDelivered(string invoiceNumber);

    function createInvoice(string memory invoiceNumber, uint256 amount, address payable buyer, address payable seller) public {
        require(invoices[invoiceNumber].buyer == address(0), "Invoice already exists");

        invoices[invoiceNumber] = InvoiceDetail({
            invoiceNumber: invoiceNumber,
            amount: amount,
            buyer: buyer,
            seller: seller,
            isPaid: false,
            isDelivered: false
        });

        emit InvoiceCreated(invoiceNumber, amount, buyer, seller);
    }

    function markAsPaid(string memory invoiceNumber) public payable {
        InvoiceDetail storage invoice = invoices[invoiceNumber];
        require(invoice.buyer == msg.sender, "Only the buyer can mark the invoice as paid");
        require(!invoice.isPaid, "Invoice already paid");
        require(msg.value == invoice.amount, "Incorrect amount");

        invoice.isPaid = true;
        emit InvoicePaid(invoiceNumber);
    }

    function markAsDelivered(string memory invoiceNumber) public {
        InvoiceDetail storage invoice = invoices[invoiceNumber];
        require(invoice.seller == msg.sender, "Only the seller can mark the invoice as delivered");
        require(invoice.isPaid, "Invoice is not paid yet");
        require(!invoice.isDelivered, "Invoice already delivered");

        invoice.isDelivered = true;
        invoice.seller.transfer(invoice.amount);
        emit InvoiceDelivered(invoiceNumber);
    }
}
