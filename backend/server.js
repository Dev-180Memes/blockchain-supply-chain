const app = require("./app");
const connectDB = require("./config/db");
const config = require("./config/config");

connectDB();

app.listen(config.port, () => {
    console.log(`Server running on port ${port}`);
});