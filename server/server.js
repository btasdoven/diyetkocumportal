if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var qs = require('querystring');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const dal = require('./dal');
const email = require('./email');
var compression = require('compression');
var multer = require('multer');

const delayInResponseInMs = 50;

app.use(cors());
app.use(compression({
  threshold:0, 
  filter: (req, res) => { var x = compression.filter(req, res); console.log('to-be-compressed', x, ' ', req.originalUrl, res.getHeader('Content-Type')); return x; }  
}));
 
app.use('/api/v1/public', express.static('public'))
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(function (req, res, next) {
  var retry = 0

  var func = () => {
    if (dal.isLoaded() != true) {
      console.log("retry " + retry + " for " + req.originalUrl);
      if (++retry == 5) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({message: "Servis güncelleniyor. Birazdan tekrar deneyiniz."});
      } else {
        setTimeout(func, 500);
      }
    } else {
      next()
    }
  };

  func();
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + req.params.userId + '-' + req.params.danisanUserName + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file')


app.get("/api/v1/users/:userId/messagePreviews", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getMessagePreviews(req.params.userId));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/danisanPreviews", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanPreviews(req.params.userId));
  }), delayInResponseInMs); 
});

app.get("/api/v1/users/:userId/appointments/:date?", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDietitianAppointmentInfo(req.params.userId, req.params.date));
  }), delayInResponseInMs);
}); 

app.put("/api/v1/users/:userId/appointments/:date/times/:time", (req, res, next) => {
  setTimeout((function() { 
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDietitianAppointmentInfo(req.params.userId, req.params.date, req.params.time, req.body));
  }), delayInResponseInMs);
});

app.get("/api/v1/links/:linkId", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.params)
    res.json(dal.getLinkInfo(req.params.linkId));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/profile", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.params)
    res.json(dal.getDietitianProfile(req.params.userId));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/profile", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDietitianProfile(req.params.userId, req.body));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/profile", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDietitianProfile(req.params.userId, req.body));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/danisans/:danisanUserName/profile", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanProfile(req.params.userId, req.params.danisanUserName));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/danisans/:danisanUserName/profile", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDanisanProfile(req.params.userId, req.params.danisanUserName, req.body));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/danisans/:danisanUserName/notes", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanNotes(req.params.userId, req.params.danisanUserName));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/danisans/:danisanUserName/notes", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDanisanNotes(req.params.userId, req.params.danisanUserName, req.body));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/danisans/:danisanUserName/files", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanFiles(req.params.userId, req.params.danisanUserName));
  }), delayInResponseInMs);
});

app.post("/api/v1/users/:userId/danisans/:danisanUserName/addFiles", (req, res, next) => {
  setTimeout((function() {
    upload(req, res, function (err) {
      console.log(err)

      if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
      } else if (err) {
          return res.status(500).json(err)
      }
      console.log(req.file)      
      console.log(req.body)
      console.log(req.body['type'])
      res.setHeader('Content-Type', 'application/json');
      res.json(dal.addDanisanFiles(req.params.userId, req.params.danisanUserName, req.file, req.body['type']));
    })  
  }), delayInResponseInMs);
}); 
 
app.put("/api/v1/users/:userId/danisans/:danisanUserName/dietlist", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDanisanDietList(req.params.userId, req.params.danisanUserName, req.body));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/danisans/:danisanUserName/dietlist", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanDietList(req.params.userId, req.params.danisanUserName));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/danisans/:danisanUserName", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    dal.postAddDanisan(req.params.userId, req.params.danisanUserName, req.body);
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