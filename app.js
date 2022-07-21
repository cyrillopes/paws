const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const cors = require("cors");
let port = process.env.PORT || 3000;
const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
const mongoUrl = process.env.MONGOURL;
let db;

// app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  // res.send("hello");
});

app.get("/location", (req, res) => {
  db.collection("location")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/category", (req, res) => {
  db.collection("category")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/shop", (req, res) => {
  db.collection("shop")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/shop/:category_id", (req, res) => {
  let query = {};
  let sort = { price: 1 };
  let categoryId = Number(req.params.category_id);
  let brand = req.query.brand;
  let lcost = Number(req.query.lcost);
  let hcost = Number(req.query.hcost);

  if (req.query.sort) {
    sort = { price: req.query.sort };
  }
  if (brand && lcost && hcost) {
    query = {
      category_id: categoryId,
      $and: [{ price: { $gt: lcost, $lt: hcost } }],
      brand: brand,
    };
  } else if (lcost && hcost) {
    query = {
      category_id: categoryId,
      $and: [{ price: { $gt: lcost, $lt: hcost } }],
    };
  } else if (brand) {
    query = { brand: brand };
  } else {
    query = { category_id: categoryId };
  }
  db.collection("shop")
    .find(query)
    .sort(sort)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/details/:category_id/:id", (req, res) => {
  let categoryId = Number(req.params.category_id);
  let id = Number(req.params.id);
  db.collection("shop")
    .find({ category_id: categoryId, id: id })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/breed", (req, res) => {
  let query = {};
  let breedId = Number(req.query.breed_id);
  if (breedId) {
    query = {
      breed_id: cat,
    };
  }
  db.collection("breed")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/adoption/:breed_id", (req, res) => {
  let query = {};
  let breedId = Number(req.params.breed_id);
  db.collection("adoption")
    .find({ breed_id: breedId })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

mongoClient.connect(mongoUrl, (err, client) => {
  if (err) console.log(err);
  db = client.db("paws");
  app.listen(port, () => {
    console.log("Listening on port 3001");
  });
});
