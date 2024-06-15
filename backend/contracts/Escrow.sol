// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    struct EscrowDetail {
        string invoiceNumber;
        uint256 amount;
        address payable buyer;
        address payable seller;
        bool isPaid;
        bool isReleased;
    }

    mapping(string => EscrowDetail) public escrows;

    event FundsDeposited(string invoiceNumber, uint256 amount, address buyer, address seller);
    event FundsReleased(string invoiceNumber);

    function depositFunds(string memory invoiceNumber, address payable buyer, address payable seller) public payable {
        require(escrows[invoiceNumber].buyer == address(0), "Escrow already exists");
        require(msg.value > 0, "Amount must be greater than 0");

        escrows[invoiceNumber] = EscrowDetail({
            invoiceNumber: invoiceNumber,
            amount: msg.value,
            buyer: buyer,
            seller: seller,
            isPaid: true,
            isReleased: false
        });

        emit FundsDeposited(invoiceNumber, msg.value, buyer, seller);
    }

    function releaseFunds(string memory invoiceNumber) public {
        EscrowDetail storage escrow = escrows[invoiceNumber];
        require(escrow.isPaid, "Funds are not paid yet");
        require(!escrow.isReleased, "Funds already released");

        escrow.isReleased = true;
        escrow.seller.transfer(escrow.amount);
        emit FundsReleased(invoiceNumber);
    }
}
