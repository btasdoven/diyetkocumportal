const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const dal = require('./dal')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/api/v1/users/:userId/materials/:materialId", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getMaterials(req.params.userId, req.params.materialId));
  }), 500);
});

app.get("/api/v1/users/:userId/getAllFieldList", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getAllFieldList(req.params.userId));
  }), 500);
});

app.get("/api/v1/users/:userId/groups/:groupId?", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getGroups(req.params.userId, req.params.groupId));
  }), 500);
});

app.get("/api/v1/users/:userId/groups/:groupId/fields", (req, res, next) => {
  console.log(req.params);
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getFields(req.params.userId, req.params.groupId));
  }), 500);
});

app.get("/api/v1/links/:userId/:linkId", (req, res, next) => {
  console.log(req.params);
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getLink(req.params.userId, req.params.linkId));
  }), 500);
});

app.put("/api/v1/users/:userId/groups/:fieldId", (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    dal.setFields(req.params.userId, req.params.fieldId, req.body);
    res.status(200).json('success');
});

app.post("/api/v1/users/auth", (req, res, next) => {
  setTimeout((function() {
    if (req.body.username == 'btasdoven' && req.body.password == '12341234') {
      res.setHeader('Content-Type', 'application/json');
      res.json({token: 'Civil Management', username: 'btas', id: 5});
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json({message: "unauthorized access"});
    }  
  }), 500);
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Listing on port 4000");
});
