const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const savingRouter = require("./routes/savingRouter");
const app = express();

require("dotenv").config({
  path: "./.env",
})

//!Connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

//! Cors config
const corsOptions = {
  origin: ["http://localhost:5174"],
};
app.use(cors(corsOptions));
//!Middlewares
app.use(express.json()); //?Pass incoming json data
//!Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
app.use("/", savingRouter);
//! Error
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server is running on this port... ${PORT} `)
);
