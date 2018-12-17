const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

function createData(id, name, value) {
  return { id, name, value };
}

const rows = [
  createData('basic/name', 'Name', 'Cagla'),
  createData('basic/surname', 'Surname', 'Istanbulluoglu Tasdoven'),
  createData('basic/mobile', 'Mobile', '+1 (123)-456-7859'),
];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/v1/users/5", (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(rows);
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
