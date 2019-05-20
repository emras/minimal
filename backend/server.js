const mongoose =require("mongoose");
const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
var ObjectId = mongoose.Types.ObjectId;

const API_PORT = 3001;
const app = express();
app.use(cors());
app.set('trust proxy', true);
const router = express.Router();

const dbRoute = "CONNECTION_STRING_URI";

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

mongoose.set('useFindAndModify', false);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// GET
router.get("/getAllData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// GET BY ID
router.post("/getById", (req, res) => {
  const { id } = req.body;

  Data.find({'_id': id, readBy: {$exists: false }}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// UPDATE
router.post("/updateData", (req, res) => {
  const { id } = req.body;
  let update = { 'message': '', 'readBy': req.ip };
  let query = { '_id': id };
  Data.findOneAndUpdate(query, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// DELETE
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// CREATE
router.post("/putData", (req, res) => {
  let data = new Data();

  const { message } = req.body;

  if (!message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.createdBy = req.ip;
  data.save((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data.id });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log('LISTENING ON PORT ${API_PORT}'));