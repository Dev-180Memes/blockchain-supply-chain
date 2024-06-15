const Invoice = artifacts.require("Invoice");
const Escrow = artifacts.require("Escrow");

module.exports = function (deployer) {
    deployer.deploy(Invoice);
    deployer.deploy(Escrow);
};
