const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const { connectDb } = require("./db/db.js");
const userRoute = require("./routes/user.routes.js");
const PaymentRoute = require("./routes/payment.route.js");
const geminiRoute = require("./routes/gemini.routes.js");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/", userRoute);
app.use("/api/payment", PaymentRoute);
app.use("/", geminiRoute);

app.listen(PORT, "127.0.0.1", () => {
  console.log("Server is listening on PORT", PORT);
  connectDb();
});
