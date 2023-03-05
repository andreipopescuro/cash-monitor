const express = require("express");
const dbConnect = require("./config/dbConnect.js");
const UserRoute = require("./routes/userRoutes.js");
const DepositRoute = require("./routes/depositRoutes.js");
const WithDrawRoute = require("./routes/withdrawRoutes.js");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
dbConnect();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", UserRoute);
app.use("/api/deposit", DepositRoute);
app.use("/api/withdraw", WithDrawRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json("Server running");
  });
}

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
