const express = require("express");
const app = express();

// Add the EJS Layouts
const expressLayouts = require("express-ejs-layouts");

// Importing routes
const router = require("./routes/routes");
const author = require("./routes/author");

// Importing the .env file
require("dotenv").config();

// acces the input fields
const bodyParser = require("body-parser");

// Setting up the port
const PORT = process.env.PORT || 3000;

// Set View engine to ejs
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

// Using the default routes
app.use("/", router);
// using the author routes
app.use("/authors", author);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(
    `Server running at port number ${PORT} and ${process.env.MONGOOSE_URI} `
  );
});
