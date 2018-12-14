const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/v1/civil", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json({x: 'Civil Management '});
  }), 5000);
});

app.post("/api/v1/users/auth", (req, res, next) => {
    if (req.body.username == 'btasdoven' && req.body.password == '12341234') {
      res.setHeader('Content-Type', 'application/json');
      res.json({token: 'Civil Management', username: 'btas'});
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(400, JSON.stringify({message: "unauthorized access"}))
    }  
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Listing on port 4000");
});
