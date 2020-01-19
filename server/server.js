if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const dal = require('./dal')
const email = require('./email')
var compression = require('compression')

const delayInResponseInMs = 50;

app.use(cors());
app.use(compression({
  threshold:0, 
  filter: (req, res) => { var x = compression.filter(req, res); console.log('to-be-compressed', x, ' ', req.originalUrl); return x; }  
}));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(function (req, res, next) {
  if (dal.isLoaded() != true) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({message: "Servis güncelleniyor. Birazdan tekrar deneyiniz."});
  } else {
    next()
  }
})

// We changed user id to user name. This mapping is needed for backward compatibility.
//
const getUserId = (userId) => {
  console.log(userId)
  if (userId == 5) {
    return 'demo'
  } else if (userId == 6) {
    return 'dyt.kubra_aydin'
  } else if (userId == 7) {
    return 'dyt_ezelkavadar'
  }

  return userId;
}

app.get("/api/v1/users/:userId/messagePreviews", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getMessagePreviews(getUserId(req.params.userId)));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/danisanPreviews", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanPreviews(getUserId(req.params.userId)));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/appointments/:date?", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDietitianAppointmentInfo(getUserId(req.params.userId), req.params.date));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/appointments/:date/times/:time", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDietitianAppointmentInfo(getUserId(req.params.userId), req.params.date, req.params.time, req.body));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/profile", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.params)
    res.json(dal.getDietitianProfile(getUserId(req.params.userId)));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/profile", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDietitianProfile(getUserId(req.params.userId), req.body));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/profile", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDietitianProfile(getUserId(req.params.userId), req.body));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/danisans/:danisanUserName/profile", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanProfile(getUserId(req.params.userId), req.params.danisanUserName));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/danisans/:danisanUserName/profile", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDanisanProfile(getUserId(req.params.userId), req.params.danisanUserName, req.body));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/danisans/:danisanUserName/notes", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanNotes(getUserId(req.params.userId), req.params.danisanUserName));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/danisans/:danisanUserName/notes", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDanisanNotes(getUserId(req.params.userId), req.params.danisanUserName, req.body));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/danisans/:danisanUserName/dietlist", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDanisanDietList(getUserId(req.params.userId), req.params.danisanUserName, req.body));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/danisans/:danisanUserName/dietlist", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanDietList(getUserId(req.params.userId), req.params.danisanUserName));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/danisans/:danisanUserName", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    dal.postAddDanisan(getUserId(req.params.userId), req.params.danisanUserName, req.body);
    res.status(200).json('success');
  }), delayInResponseInMs);
});

app.post("/api/v1/users/auth", (req, res, next) => {
  setTimeout((function() {
    var ret = dal.loginUser(req.body.username.toLowerCase(), req.body.password)

    if (ret.error == undefined) {
      var user = ret.user;
      res.setHeader('Content-Type', 'application/json');
      res.json({token: 'Civil Management', url: user.url, name: user.name, username: user.username, id: user.id});
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({message: ret.error});
  }), delayInResponseInMs);
});

app.post("/api/v1/users/signup", (req, res, next) => {
  setTimeout((function() {
    var ret = dal.signUpUser(req.body.username.toLowerCase(), req.body)

    if (ret.error == undefined) {
      var user = ret.user;
      res.setHeader('Content-Type', 'application/json');
      res.json({url: user.url, name: user.name, username: user.username, id: user.id});
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({message: ret.error});
  }), delayInResponseInMs);
});

console.log(process.env.PORT);

app.listen(process.env.PORT || 4000, () => {
  console.log("Listing on port 4000");
});