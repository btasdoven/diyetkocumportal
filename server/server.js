if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// require('console-stamp')(console, 'HH:MM:ss.l');

const serverVersion = 1.0
const jwt = require('jsonwebtoken');

const stringHash = require("string-hash");
const qs = require('querystring');
const express = require("express");
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const dal = require('./dal');
const email = require('./email');
const ig = require('./ig');
const compression = require('compression');
const multer = require('multer');
const massemail = require('./massemail')

console.log(process.arch)
console.log(process.version)

const delayInResponseInMs = 0;

const allowedOrigins = [
  'http://localhost:3000',
  'https://www.diyetkocum.net',
  'https://diyetkocum.net'];

app.enable('etag') // use strong etags

app.use(cors({
  credentials: true,
  origin: function(origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  }
}));

app.use(compression({
  threshold:0, 
  filter: (req, res) => { 
    var x = compression.filter(req, res); 
    // console.log('to-be-compressed', x, ' ', req.originalUrl, res.getHeader('Content-Type'));
    return x; 
  }  
}));

app.use('/api/v1/public', express.static('public', { 
  //maxAge: 31536000 * 1000,
  etag: true,
}))

// app.use(session({
//   secret: 'halil-batu',
//   // create new redis store.
//   // store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl : 260}),
//   // store: new MemcachedStore({ hosts: ['127.0.0.1:11211'], secret: 'memcached-secret-key' }),
//   store: new FileStore(),
//   saveUninitialized: false,
//   resave: true
// }));

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
        setTimeout(func, 1000);
      }
    } else {
      next()
    }
  };

  func();
})

// app.param('userId', function(req, res, next) {
//   // if (req && req.params && req.params.userId) {
//   //   if (!dal.isPremiumUser(req.params.userId)) {
//   //     if (!req.originalUrl.endsWith("/profile")) {
//   //       res.setHeader('Content-Type', 'application/json');
//   //       res.status(402).json({code: 'PREMIUM_EXPIRED', message: "Premium üyeliğiniz aktif değil. Tekrar giriş yapınız."});
//   //       return;
//   //     }
//   //   } else if (req.params.userId == 'yaseminozman') {
//   //     res.setHeader('Content-Type', 'application/json');
//   //     res.status(401).json({code: 'LOGIN_EXPIRED', message: "Giriş yaptığınız bilgiler geçerliliğini yitirmiştir. Tekrar giriş yapınız."});
//   //     return;
//   //   }
//   // }

//   next();
// })

morgan.format("date", function() {
  var df = require('dateformat');
  return df(new Date(), 'HH:MM:ss.l');
})
app.use(morgan('[:date] [:method]\t:url :status :res[content-length] - :response-time ms'))

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/${req.params.userId}`)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + req.params.userId + '-' + req.params.danisanUserName + '-' + file.originalname)
  }
})

var storageForAdmin = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req)
    console.log(file)
    cb(null, `public/${req.params.userId}`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var uploadMeasurements = multer({ storage: storage })
var upload = multer({ storage: storage }).single('file')
var uploadForAdmin = multer({ storage: storageForAdmin }).single('file')

var retrieveJwtInfo = function (req, res, next) {
  var token = req.headers['x-access-token'];

  console.log('token', token)

  if (!token) {
    next();
    return;
  }
  
  jwt.verify(token, process.env.EMAIL_PASS, function(err, decoded) {
    if (err) {
      next();
      return;
    }
    
    res.locals.jwtToken = token;
    res.locals.jwtUser = decoded.id;

    console.log(decoded)

    next();
  });
}

var registerJwtInfo = function (req, res, next) {
  var token = req.headers['x-access-token'];

  console.log('token', token)

  if (!token) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(401).send({ message: 'Kimliğiniz doğrulanamadı. Yeniden giriş yapınız.' });
  }
  
  jwt.verify(token, process.env.EMAIL_PASS, function(err, decoded) {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(401).send({ message: 'Geçersiz kimlik bilgieri.' });
    }
    
    res.locals.jwtToken = token;
    res.locals.jwtUser = decoded.id;

    console.log(decoded)

    next();
  });
}

var verifyJwtToken = function (req, res, next) {
  var token = req.headers['x-access-token'];

  console.log('token', token)

  if (!token) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(401).send({ message: 'Kimliğiniz doğrulanamadı. Yeniden giriş yapınız.' });
  }
  
  jwt.verify(token, process.env.EMAIL_PASS, function(err, decoded) {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(401).send({ message: 'Geçersiz kimlik bilgieri.' });
    }
    
    res.locals.jwtToken = token;
    res.locals.jwtUser = decoded.id;

    console.log(decoded)

    if (req && req.params && req.params.userId) {
      if (req.params.userId != decoded.id) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(401).send({ message: 'Bu bilgiye erişiminiz yoktur.' });
      }
    }

    next();
  });
}

var isPremiumUser = function (req, res, next) {
  if (req && req.params && req.params.userId) {
    // console.log('premium', req.originalUrl, req.params, req.session.views)

    if (!dal.isPremiumUser(req.params.userId)) {
      // console.log('setting premium', req.originalUrl, req.params, req.session.views)

      if (req.body && req.body.cvc) {
        // This must be for adding a new credit card to possibly extend premium date?
        // Allow the PUT request. 
        //
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(401).json({code: 'PREMIUM_EXPIRED', message: "Premium üyeliğiniz aktif değil. Tekrar giriş yapınız."});
        return;
      }
    }
  }

  next();
}

app.get("/api/v1/users/:userId/messagePreviews", verifyJwtToken, (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getMessagePreviews(req.params.userId));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/danisanPreviews", verifyJwtToken, (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanPreviews(req.params.userId));
  }), delayInResponseInMs); 
});

app.get("/api/v1/users/:userId/statistics", (req, res, next) => {
  setTimeout(function () {
    res.setHeader("Content-Type", "application/json");
    res.json(dal.getDietitianStatistics(req.params.userId));
  }, delayInResponseInMs);
});

app.get("/api/v1/users/:userId/appointments/pending", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDietitianAppointmentsPending(req.params.userId));
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

app.get("/api/v1/users/:userId/appointments/:date/times/:time", (req, res, next) => {
  setTimeout(function () {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDietitianAppointmentInfo(req.params.userId, req.params.date, req.params.time));
  });
});

app.get("/api/v1/links/:linkId", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getLinkInfo(req.params.linkId));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/comments", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDietitianComments(req.params.userId));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/comments", verifyJwtToken, isPremiumUser, (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDietitianComments(req.params.userId, req.body));
  }), delayInResponseInMs);
});

app.post("/api/v1/users/:userId/newcomment", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.postDietitianComment(req.params.userId, req.body));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/profile", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDietitianProfile(req.params.userId));
  }), delayInResponseInMs);
});


app.put("/api/v1/users/:userId/profile", verifyJwtToken, isPremiumUser, (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.putDietitianProfile(req.params.userId, req.body));
  }), delayInResponseInMs);
});

app.post("/api/v1/users/:userId/makePayment", registerJwtInfo, (req, res, next) => {
  setTimeout((function() {
    if (res.locals.jwtUser != '_hsahin_' && res.locals.jwtUser != 'demo') {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json({message: 'Bad Request'});
      return;
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.makePayment(req.params.userId, req.body));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/danisans/:danisanUserName/messages", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanMessages(req.params.userId, req.params.danisanUserName));
  }), delayInResponseInMs);
});

app.post("/api/v1/users/:userId/danisans/:danisanUserName/messages/read", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.readDanisanMessages(req.params.userId, req.params.danisanUserName));
  }), delayInResponseInMs);
});

app.put("/api/v1/users/:userId/danisans/:danisanUserName/messages/:messageId", isPremiumUser, (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.addDanisanMessage(req.params.userId, req.params.danisanUserName, req.params.messageId, req.body));
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

app.delete("/api/v1/users/:userId/danisans/:danisanUserName/measurements/:date/:time", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.deleteDanisanMeasurement(req.params.userId, req.params.danisanUserName, req.params.date, req.params.time));
  }), delayInResponseInMs);
});

app.get("/api/v1/users/:userId/danisans/:danisanUserName/measurements", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getDanisanMeasurements(req.params.userId, req.params.danisanUserName));
  }), delayInResponseInMs);
});

app.post("/api/v1/users/:userId/danisans/:danisanUserName/addMeasurement", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.addDanisanMeasurement(req.params.userId, req.params.danisanUserName, req.body));
  }), delayInResponseInMs);
});

app.post("/api/v1/users/:userId/danisans/:danisanUserName/addMeasurementWithPhoto", uploadMeasurements.single('file'), (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');    
    res.json(dal.addDanisanMeasurement(req.params.userId, req.params.danisanUserName, req.body, req.file));
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

app.post("/api/v1/:userId/uploadProfilePhoto", (req, res, next) => {
  setTimeout((function() {
    req.params.danisanUserName = 'profilepic';
    upload(req, res, function (err) {
      console.log(err)

      if (err) {
          return res.status(500).json(err)
      }

      console.log(req.file)      
      dal.uploadDietitianProfilePhoto(req.params.userId, req.file)
        .then(resp => {
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
        }).catch(err => res.status(500).json(err));
    })  
  }), delayInResponseInMs);
}); 

app.post("/api/v1/:userId/uploadPhoto", (req, res, next) => {
  setTimeout((function() {
    console.log(req.params.userId)
    uploadForAdmin(req, res, function (err) {
      console.log(err)

      if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
      } else if (err) {
          return res.status(500).json(err)
      }
      console.log(req.file)  
      console.log(req.body)
      res.setHeader('Content-Type', 'application/json');
      res.json({file: req.file});
    })  
  }), delayInResponseInMs);
}); 
 
app.put("/api/v1/addNewPost", (req, res, next) => {
  setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.addNewPost(req.body));
  }), delayInResponseInMs);
});
 
app.put("/api/v1/users/:userId/danisans/:danisanUserName/dietlist", isPremiumUser, (req, res, next) => {
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

      var token = jwt.sign({ id: user.username, server_version: serverVersion }, process.env.EMAIL_PASS, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.setHeader('Content-Type', 'application/json');
      res.json({token: token, url: user.url, name: user.name, username: user.username, id: user.id, premium_until: user.premium_until});
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({message: ret.error});
  }), delayInResponseInMs);
});

app.post("/api/v1/users/reauth", (req, res, next) => {
  setTimeout((function() {
    var ret = dal.reloginUser(req.body.username.toLowerCase(), req.body.userInfo)

    if (req.body.userInfo.premium_until == undefined) {
      res.setHeader('Content-Type', 'application/json');
      res.status(401).json({code: 'PREMIUM_EXPIRED', message: "Premium üyeliğiniz sona ermiştir. Tekrar giriş yapınız."});
      return;
    }

    if (ret.error == undefined) {
      var user = ret.user;
      res.setHeader('Content-Type', 'application/json');
      res.json({token: stringHash(user.username), url: user.url, name: user.name, username: user.username, id: user.id, premium_until: user.premium_until});
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({message: ret.error});
  }), delayInResponseInMs);
});

app.post("/api/v1/users/signup", (req, res, next) => {
  setTimeout((function() {
    dal.signUpUser(req.body.username.toLowerCase(), req.body)
      .then(user => {
        res.setHeader('Content-Type', 'application/json');
        res.json({url: user.url, name: user.name, username: user.username, id: user.id});
      })
      .catch(err => {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({message: err});
      })

    // if (ret.error == undefined) {
    //   var user = ret.user;
    //   res.setHeader('Content-Type', 'application/json');
    //   res.json({url: user.url, name: user.name, username: user.username, id: user.id});
    //   return;
    // }

    // res.setHeader('Content-Type', 'application/json');
    // res.status(400).json({message: ret.error});
  }), delayInResponseInMs);
});

app.post("/api/v1/users/requestNewPasswordEmail", (req, res, next) => {
  setTimeout((function() {
    dal.requestNewPasswordEmail(req.body.username.toLowerCase(), req.body)
      .then(user => {
        res.setHeader('Content-Type', 'application/json');
        res.json({url: user.url, name: user.name, username: user.username, id: user.id});
      })
      .catch(err => {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({message: err});
      })
  }), delayInResponseInMs);
});

app.post("/api/v1/users/resetPassword", (req, res, next) => {
  setTimeout((function() {
    dal.resetPassword(req.body.username.toLowerCase(), req.body)
      .then(user => {
        res.setHeader('Content-Type', 'application/json');
        res.json({url: user.url, name: user.name, username: user.username, id: user.id});
      })
      .catch(err => {
      })
  }), delayInResponseInMs);
});

//
// ADMIN data
//
app.get("/api/v1/getAppointmentData", (req, res, next) => {
  // setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(dal.getAppointmentData(), null, 4));
  // }), delayInResponseInMs);
});

// This is for landing page
//
app.delete("/api/v1/users/:userId", registerJwtInfo, (req, res, next) => {
  // setTimeout((function() {
    if (res.locals.jwtUser != '_hsahin_' && res.locals.jwtUser != 'demo') {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json({message: 'Bad Request'});
      return;
    }

    dal.deleteDietitian(req.params.userId, req.body).then(resp => {
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json({message: err});
    });
  // }), delayInResponseInMs);
});

app.get("/api/v1/posts", (req, res, next) => {
  // setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getAllPosts());
  // }), delayInResponseInMs);
});

// This for landing page
//
app.get("/api/v1/getAllDietitians", (req, res, next) => {
  // setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    res.json(dal.getAllDietitians(req.query.isAdmin));
  // }), delayInResponseInMs);
});

// This is for internal analytics
//
app.get("/api/v1/getAllDietitianProfiles", (req, res, next) => {
  // setTimeout((function() {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.params)
    res.send(JSON.stringify(dal.getDietitianProfiles(), null, 4));
  // }), delayInResponseInMs);
});

app.get('/api/v1/profilepic/:username', (req, res) => {
  var png = require('./png')
  png.drawProfilePicture(req.params.username).then( (stream) => {
    res.setHeader('Content-Type', 'image/png');
    stream.pipe(res);
  }).catch((err) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({message: err});
  })
})

app.get("/api/v1/runig", (req, res, next) => {
  // setTimeout((function() {
    ig.sendIgMsgForNewAppointment('btasdoven', 'Batuhan Tasdoven', 'https://diyetkocum.net');

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({}, null, 4));
  // }), delayInResponseInMs);
});

app.get('/api/v1/sendMassEmail', (req, res) => {
  dal.sendMassEmail().then( (val) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(val, null, 4));
  }).catch( (err) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({message: err});
  });
})

app.put('/api/v1/trackActivity/:userId?', retrieveJwtInfo, (req, res) => {
  setTimeout((function() {
    dal.trackActivity(res.locals.jwtUser, req.params.userId || undefined, req.body ? req.body.event : undefined)
    res.setHeader('Content-Type', 'application/json');
    res.json({});
  }), delayInResponseInMs);
})

app.get('/api/v1/tracking/:topic/:email/img.gif', (req, res) => {
  const trackImg = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

  res.writeHead(200, {
    'Content-Type': 'image/gif',
    'Content-Length': trackImg.length
  })

  console.log('tracking')
  const { topic, email } = req.params 

  dal.trackTopic(topic, email)
  
  res.end(trackImg)
})

//
// Start of SSR
//

app.get("/:userId", (req, res, next) => {
  var user = dal.getDietitianProfile(req.params.userId);
  
  var title ='Diyet Koçum'
  var descr = 'Diyetisyenlerin Dijital Asistanı'
  var img = 'static/favicon_lg.png'  
  var url = `https://diyetkocum.net${req.originalUrl}`
  var jsonld = undefined;
    
  if (user != undefined && Object.keys(user).length > 0) {
    title = (user.unvan != undefined ? user.unvan + ' ' : '') + user.name + " (@" + req.params.userId + ")"
    descr = 'Diyet Koçum üzerinden tüm yazıları gör, danışan yorumlarını incele, ofis bilgilerine ulaş ya da randevu al'
    img = user.url
  
    jsonld = {
      "@context" : "http://schema.org",
      "@type" : "LocalBusiness",
      "name" : user.name,
      "image" : `https://diyetkocum.net/${user.url}`,
      "url" : `https://diyetkocum.net/${req.params.userId}`,
      "aggregateRating" : {
        "@type" : "AggregateRating",
        "ratingValue" : "5",
        "ratingCount" : "13"
      }
    }

    if (user.addresses != undefined && Object.keys(user.addresses).length > 0) {
      jsonld.address = {
        "@type" : "PostalAddress",
        "streetAddress" : user.addresses[Object.keys(user.addresses)[0]].address,
        "addressCountry" : "TR"
      }
    }
  }  

  htmlTemplate()    
    .then((str) => {
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Cache-Control', 'max-age=86400');
      res.send(subParams(str, title, descr, img, url, jsonld));    
    });
});

app.get("/diyetisyen/:slugifiedName", (req, res, next) => {
  var user = dal.getDietitianProfileBySlugifiedName(req.params.slugifiedName);

  var title ='Diyet Koçum'
  var descr = 'Diyetisyenlerin Dijital Asistanı'
  var img = 'static/favicon_lg.png'  
  var url = `https://diyetkocum.net${req.originalUrl}`
  var jsonld = undefined;
    
  if (user != undefined && Object.keys(user).length > 0) {
    var userId = user.username
    
    title = (user.unvan != undefined ? user.unvan + ' ' : '') + user.name + " (@" + userId + ")"
    descr = 'Diyet Koçum üzerinden tüm yazıları gör, danışan yorumlarını incele, ofis bilgilerine ulaş ya da randevu al'
    img = user.url
  
    jsonld = {
      "@context" : "http://schema.org",
      "@type" : "LocalBusiness",
      "name" : user.name,
      "image" : `https://diyetkocum.net/${user.url}`,
      "url" : `https://diyetkocum.net/${userId}`,
      "aggregateRating" : {
        "@type" : "AggregateRating",
        "ratingValue" : "5",
        "ratingCount" : "13"
      }
    }

    if (user.addresses != undefined && Object.keys(user.addresses).length > 0) {
      jsonld.address = {
        "@type" : "PostalAddress",
        "streetAddress" : user.addresses[Object.keys(user.addresses)[0]].address,
        "addressCountry" : "TR"
      }
    }
  }  

  htmlTemplate()    
    .then((str) => {
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Cache-Control', 'max-age=86400');
      res.send(subParams(str, title, descr, img, url, jsonld));    
    });
});

app.get("/:userId/blog/:blogId", (req, res, next) => {
  var user = dal.getDietitianProfile(req.params.userId);
  var post = dal.getPost(req.params.userId, req.params.blogId)

  var title ='Diyet Koçum'
  var descr = 'Diyetisyenlerin Dijital Asistanı'
  var img = 'static/favicon_lg.png'  
  var url = `https://diyetkocum.net${req.originalUrl}`
  var jsonld = undefined;

  if (user != undefined && Object.keys(user).length > 0 && post != undefined) {
    title = post.title
    descr = (user.unvan != undefined ? user.unvan + ' ' : '') + user.name + " (@" + req.params.userId + ")"
    img = user.url
    jsonld = { 
      "@context": "https://schema.org", 
      "@type": "BlogPosting",
      "headline": post.title,
      "image": `https://diyetkocum.net/${post.img}`,
      "publisher": {
        "@type": "Organization",
        "name": "Diyet Koçum",
        "url": "https://diyetkocum.net",
        "sameAs": [
          "https://twitter.com/diyetkocumnet",
          "https://www.instagram.com/diyetkocumnet/"
        ],
        "logo": {
          "@type": "ImageObject",
          "url": "https://diyetkocum.net/static/favicon.png"
        }
      },
      "mainEntityOfPage": "True",
      "url": `https://diyetkocum.net${req.originalUrl}`,
      "datePublished": post.date ? moment(post.date).format("YYYY-MM-DD") : "2020-04-07",
      "dateCreated": post.date ? moment(post.date).format("YYYY-MM-DD") : "2020-04-07",
      "dateModified": post.date ? moment(post.date).format("YYYY-MM-DD") : "2020-04-07",
      "articleBody": post.text,
      "author": {
        "@type": "Person",
        "name": user.name,
        "jobTitle": user.unvan,
        "url": `https://diyetkocum.net/${req.params.userId}`,
        "image": `https://diyetkocum.net/${user.url}`
      }
     }
  }  
  
  htmlTemplate()    
    .then((str) => {
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Cache-Control', 'max-age=86400');
      res.send(subParams(str, title, descr, img, url, jsonld));    
    });
});

app.get("/l/:linkId", (req, res, next) => {
  var linkInfo = dal.getLinkInfo(req.params.linkId, true);
  
  var title ='Diyet Koçum'
  var descr = 'Diyetisyenlerin Dijital Asistanı'
  var img = 'static/favicon_lg.png'  
  var url = `https://diyetkocum.net${req.originalUrl}`
    
  if (linkInfo != undefined) {
    title = linkInfo.danisanUserName
    descr = 'Danışana Özel Diyet Linki'
    img = linkInfo.dietitianUrl
  }  
  
  htmlTemplate()    
    .then((str) => {
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Cache-Control', 'max-age=86400');
      res.send(subParams(str, title, descr, img, url));    
    });
});

app.get("*", (req, res, next) => {
  var title ='Diyet Koçum'
  var descr = 'Diyetisyenlerin Dijital Asistanı'
  var img = 'static/favicon_lg.png'
  var url = `https://diyetkocum.net${req.originalUrl}`
  
  htmlTemplate()    
    .then((str) => {
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Cache-Control', 'max-age=86400');
      res.send(subParams(str, title, descr, img, url));    
    });
});

function streamToString (stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

function subParams(line, title, descr, img, url, jsonld) {
  return line
    .replace(`<meta property="og:title" content="Diyet Koçum"/>`, `<meta property="og:title" content="${title}"/>`)
    .replace(`<title>Diyet Koçum | Diyetisyenlerin Dijital Asistanı</title>`, `<title>${title}</title>`)
    .replace(`<meta property="og:description" content="Diyetisyenlerin Dijital Asistanı"/>`, `<meta property="og:description" content="${descr}"/>`)
    .replace(
      `<meta name="description" content="Diyetisyenlerin danışanlarına randevu verebileceği; otomatik anamnez formu, kan tahlili ve tartı ölçümü isteyebileceği, danışanlarının takibini yapabileceği dijital bir asistan."/>`,
      `<meta name="description" content="${descr}"/>`)
    .replace(`<meta property="og:image" content="https://diyetkocum.net/static/favicon_lg.png"/>`, `<meta property="og:image" content="https://diyetkocum.net/${img}"/>`)
    .replace(`<meta property="og:url" content="https://diyetkocum.net/"/>`, `<meta property="og:url" content="${url}"/>`)
    .replace(`<script type="application/ld+json" name="ssr-based"></script>`, jsonld == undefined
      ? ''
      : `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`)
}

function htmlTemplate() {
  return streamToString(fs.createReadStream('../client/build/index.html'))
}

//
// End of SSR
//

console.log(process.env.PORT);

app.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port " + (process.env.PORT || 4000));
});