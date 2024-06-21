# blockchain-supply-chain

To install and run this project you need to do the following:

1. Clone the repository
2. Open a terminal and install and run `ganache-cli` with the following command:

```bash
npm install -g ganache-cli
ganache-cli
```

3. Open another terminal and navigate to the backend folder and install the dependencies with the following command:

```bash
npm install
```

4. Install the truffle suite and run the migrations with the following commands:

```bash
npm install -g truffle
truffle migrate --network development
```

5. Create a `.env` file in the backend folder and add the following variables:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
BLOCKCHAIN_PROVIDER="http://localhost:8545"
INVOICE_CONTRACT_ADDRESS=
ESCROW_CONTRACT_ADDRESS=
```

6. Run the backend with the following command:

```bash
npm run dev
```

7. Open another terminal and navigate to the frontend folder and install the dependencies with the following command:

```bash
npm install
```

8. Run the frontend with the following command:

```bash
npm run dev
```
