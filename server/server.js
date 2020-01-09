const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const dal = require('./dal')

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// app.put("/api/v1/users/:userId/messagePreviews", (req, res, next) => {
//   setTimeout((function() {
//     res.setHeader('Content-Type', 'application/json');
//     dal.putDiary(req.params.userId, req.params.date, req.body);
//     res.status(200).json('success');
//   }), 500);
// });

app.get("/api/v1/users/:userId/messagePreviews", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getMessagePreviews(req.params.userId));
  }), 500);
});

app.get("/api/v1/users/:userId/danisanPreviews", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanPreviews(req.params.userId));
  }), 500);
});

app.get("/api/v1/users/:userId/danisans/:danisanUserName/profile", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanProfile(req.params.userId, req.params.danisanUserName));
  }), 500);
});

// app.get("/api/v1/users/:userId/materials/:materialId?", (req, res, next) => {
//   setTimeout((function() {
//     res.setHeader('Content-Type', 'application/json');
//     res.json(dal.getMaterials(req.params.userId, req.params.materialId));
//   }), 500);
// });

app.post("/api/v1/users/auth", (req, res, next) => {
  setTimeout((function() {
    if (req.body.username == 'demo' && req.body.password == '1234') {
      res.setHeader('Content-Type', 'application/json');
      res.json({token: 'Civil Management', username: 'demo', id: 5});
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json({message: "unauthorized access"});
    }  
  }), 500);
});

console.log(process.env.PORT);

app.listen(process.env.PORT || 4000, () => {
  console.log("Listing on port 4000");
});
