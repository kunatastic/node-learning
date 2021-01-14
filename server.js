const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const router = require("./routes/routes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

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

app.use("/", router);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(
    `Server running at port number ${PORT} and ${process.env.MONGOOSE_URI} `
  );
});
