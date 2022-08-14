const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/.env" });

// initialize our express ap
const app = express();

// directs app to use bodyParser, moved immediately below app declaration so
// that bodyParser works universally.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// the port we will be using for access
let port = process.env.PORT || 3030;
if (process.env.SERVER_PORT != undefined) {
  port = process.env.SERVER_PORT;
}
// This Sets up mongoose connection
const mongoose = require("mongoose");
// this requires our mongoose schema
require("./models/account.model.js");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_HOST, {
  useNewUrlParser: true,
});

let db = mongoose.connection;
// test MongoDB connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// This Sets up mongoose connection
let accountDB = db.collection("accounts");

// Imports routes for the products
const account = require("./routes/account.route.js");

app.use("/account", account);

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
  console.log(
    accountDB != null
      ? accountDB.name + " database found"
      : accountDB.name + " database not found"
  );
});
