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

app.put("/api/v1/users/:userId/diaries/:date?", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    dal.putDiary(req.params.userId, req.params.date, req.body);
    res.status(200).json('success');
  }), 500);
});

app.get("/api/v1/users/:userId/diaries/:date?", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDiary(req.params.userId, req.params.date));
  }), 500);
});

app.put("/api/v1/users/:userId/envanter/:user/claim", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    dal.putClaim(req.params.userId, req.params.user);
    res.status(200).json('success');
  }), 500);
});

app.put("/api/v1/users/:userId/envanter/:user", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    dal.putEnvanter(req.params.userId, req.params.user, req.body);
    res.status(200).json('success');
  }), 500);
});

app.get("/api/v1/users/:userId/envanter/:user", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getEnvanter(req.params.userId, req.params.user));
  }), 500);
});

app.get("/api/v1/users/:userId/likes/:kim/:kimi", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getLikes(req.params.userId, req.params.kim, req.params.kimi));
  }), 500);
});

app.put("/api/v1/users/:userId/likes/:kim/:kimi/:commentIdx", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    dal.putLikes(req.params.userId, req.params.kim, req.params.kimi, req.params.commentIdx, req.body);
    res.status(200).json('success');
  }), 500);
});

app.get("/api/v1/users/:userId/materials/:materialId?", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getMaterials(req.params.userId, req.params.materialId));
  }), 500);
});

app.put("/api/v1/users/:userId/materials/:materialId/:partId", (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  dal.setMaterialPart(req.params.userId, req.params.materialId, req.params.partId, req.body);
  res.status(200).json('success');
});

app.put("/api/v1/users/:userId/groups/:fieldId", (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  dal.setFields(req.params.userId, req.params.fieldId, req.body);
  res.status(200).json('success');
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
