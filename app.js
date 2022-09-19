const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
let port = process.env.PORT || 3000;
const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
const mongoUrl = process.env.MONGOURL;
const morgan = require("morgan");
let db;

app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  // res.send("hello");
});

app.get("/shopping", function (req, res) {
  res.sendFile(__dirname + "/shop.html");
  // res.send("hello");
});

app.get("/vet", function (req, res) {
  res.sendFile(__dirname + "/vet.html");
  // res.send("hello");
});

app.get("/training", function (req, res) {
  res.sendFile(__dirname + "/training.html");
  // res.send("hello");
});

app.get("/adoption", function (req, res) {
  res.sendFile(__dirname + "/adoption.html");
  // res.send("hello");
});

app.get("/adopt-a-pet", function (req, res) {
  res.sendFile(__dirname + "/adopt-a-pet.html");
  // res.send("hello");
});

app.get("/adopt-details", function (req, res) {
  res.sendFile(__dirname + "/adopt-details.html");
  // res.send("hello");
});

app.get("/grooming", function (req, res) {
  res.sendFile(__dirname + "/groomers.html");
  // res.send("hello");
});

app.get("/shop-details", function (req, res) {
  res.sendFile(__dirname + "/shop-details.html");
  // res.send("hello");
});

app.get("/shop-listing", function (req, res) {
  res.sendFile(__dirname + "/shop-listing.html");
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
// app.get("/locations/:state_id", (req, res) => {
//   let stateId = Number(req.params.state_id);
//   let districts = String(req.query.districts);
//   let query = {};
//   if (districts) {
//     query = {
//       districts: districts,
//     };
//   } else {
//     query = {
//       state_id: stateId,
//     };
//   }
//   db.collection("location")
//     .find(query)
//     .toArray((err, result) => {
//       if (err) throw err;
//       res.send(result);
//     });
// });

// app.get("/category", (req, res) => {
//   db.collection("category")
//     .find()
//     .toArray((err, result) => {
//       if (err) throw err;
//       res.send(result);
//     });
// });

app.get("/quick-search/:category_id", (req, res) => {
  let categoryId = Number(req.params.category_id);
  db.collection("quickSearch")
    .find({ category_id: categoryId })
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
    query = { category_id: categoryId, brand: brand };
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

app.get("/adoption-details/:breed_id/:id", (req, res) => {
  let breedId = Number(req.params.breed_id);
  let id = Number(req.params.id);
  db.collection("adoption")
    .find({ breed_id: breedId, id: id })
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
      breed_id: breedId,
    };
  }
  db.collection("breed")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// app.get("/adoption/:breed_id", (req, res) => {
//   let breedId = Number(req.params.breed_id);
//   db.collection("adoption")
//     .find({ breed_id: breedId })
//     .toArray((err, result) => {
//       if (err) throw err;
//       res.send(result);
//     });
// });

//////////////////////////////////
app.get("/adoptions", (req, res) => {
  let query = {};
  let breedId = Number(req.query.breed_id);
  let vaccination = String(req.query.vaccination);
  if (vaccination && breedId) {
    query = {
      vaccination: vaccination,
      breed_id: breedId,
    };
  }
  if (vaccination) {
    query = {
      vaccination: vaccination,
    };
  }
  if (breedId) {
    query = {
      breed_id: breedId,
    };
  } else {
    query = {};
  }

  db.collection("adoption")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});
///////////////////////////////

app.post("/pawItem", (req, res) => {
  let id = req.body.id;
  // console.log(id);
  if (Array.isArray(id)) {
    // console.log(id);
    db.collection("shop")
      .find({ id: { $in: id } })
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
  }
});

app.get("/pawsOrders", (req, res) => {
  let email = req.query.email;
  let query = {};
  if (email) {
    query = { email };
  }
  db.collection("pawsOrders")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.post("/placeOrder", (req, res) => {
  db.collection("pawsOrders").insertOne(req.body, (err, result) => {
    if (err) throw err;
    res.send("Order Place Hooman");
  });
});

app.patch("/pawsOrders/:id", (req, res) => {
  let orderId = Number(req.params.id);
  db.collection("pawsOrders").updateOne(
    {
      id: orderId,
    },
    {
      $set: {
        status: req.body.status,
        bank_name: req.body.bank_name,
        date: req.body.date,
      },
    },
    (err, result) => {
      if (err) throw err;
      res.send("Order Updated");
    }
  );
});

app.delete("/deleteOrder/:id", (req, res) => {
  let _id = mongo.ObjectId(res.params.id);
  db.collection("pawsOrders").remove({ _id }, (err, result) => {
    if (err) throw err;
    res.send("Order deleted successfully");
  });
});

mongoClient.connect(mongoUrl, (err, client) => {
  if (err) console.log(err);
  db = client.db("paws");
  app.listen(port, () => {
    console.log("Listening on port 3001");
  });
});
