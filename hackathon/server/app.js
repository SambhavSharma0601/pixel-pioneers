const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoute");
const listRoute = require("./routes/listingRoutes.js");
const productRoutes = require("./routes/productRoute.js")
const connectDB = require("./db/conn.js");
const cors = require('cors');

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/list",listRoute)
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
