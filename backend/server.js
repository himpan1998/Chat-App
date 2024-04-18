const express = require("express");
const connectDB = require("./config/db.js");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
connectDB();
const userRoutes = require("./routes/index.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const path = require("path");

app.use(express.json()); //to accept the json data from the frontend

app.use("/api/user", userRoutes);
const fileupload = require("express-fileupload");

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, console.log("server is running on port 5000"));
app.use(
  fileupload({
    useTempFiles: true,
  })
);
