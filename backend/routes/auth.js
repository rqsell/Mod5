const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');
const List = require('../models/List')
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then((user) => {
      jwt.sign({ user }, 'secretkey', { expiresIn: '30min' }, (err, token) => {
        req.login(user, function (err, result) {
          res.status(201).json({ ...user._doc, token })
        })
      })
    })
    .catch((err) => {
      //console.log(err)
      res.status(500).json(err)
    });
});

router.get("/GetList", verifyToken, (req, res, next) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      List.find({ userId: authData.user._id }).then((list) => {
        //console.log(authData)
        res.json({ list });
      });
    }
  });
});





router.get('/user', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      // res.status(200).json(authData.user)
      //console.log(authData.user, 'yolo')
      User.findById(authData.user._id).then(user => {
        res.status(200).json(user)
      }).catch(err => res.status(500).json(err))

    }
  });
});


router.post("/getAllItems", verifyToken, (req, res, next) => {
  //console.log(req.body, "debug 3");
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      Item.find({ listId: req.body.listid }).then((items) => {
        //console.log(items, "debug 4");
        res.json({ items });
      });
    }
  });
});


router.post("/EditAnItem", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      // res.status(200).json(authData.user)
      // //console.log(authData.user, "yolo");
      //console.log(req.body);
      let id = req.body.id;
      delete req.body.id;
      // goal.userId = authData.user._id;
      Item.findByIdAndUpdate(id, req.body).then((item) => {
        //console.log("Item has been edited");
        res.json({ item });
      });
    }
  });
});


router.post("/DeleteAnItem", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      // res.status(200).json(authData.user)
      // //console.log(authData.user, "yolo");
      //console.log(req.body);
      let item = req.body.id;

      // goal.userId = authData.user._id;
      Item.findByIdAndDelete(item).then((item) => {
        //console.log("Item has been Deleted");
        res.json({ item });
      });
    }
  });
});









router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req;
  jwt.sign({ user }, 'secretkey', { expiresIn: '30min' }, (err, token) => {
    //console.log(err, "notworking")
    res.status(200).json({ ...user._doc, token });
  })
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: 'Logged out' });
});





router.get("/GetList/:id", verifyToken, (req, res, next) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      List.findById(req.params.id).then((list) => {
        res.json({ list });
      });
    }
  });
});


function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

router.post("/AddAList", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      // res.status(200).json(authData.user)
      //console.log(authData.user, "yolo");
      let list = req.body;
      list.userId = authData.user._id;
      List.create(list).then((list) => {
        res.json({ list });
      });
    }
  });
});
// From Ironfolio
router.post("/addFavorites", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      console.log(req.body,'bird')
      if(req.body.checked){
      User.findByIdAndUpdate(
        authData.user._id,
        {
          $addToSet: { favorites: req.body.checkeditem},
        },

        { new: true }
      )
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => res.status(500).json(err));
      } else { 
        User.findByIdAndUpdate(
          authData.user._id,
          {
            $pull: { favorites: req.body.checkeditem},
          },
          { new: true }
        )
          //.populate({path: "favorites", populate: {path: ""}})
          .then((user) => {
            res.status(200).json(user);
          })
          .catch((err) => res.status(500).json(err));
      }
    }
  });
});


router.post("/addDelete", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      //console.log(req.body, "bird")
      User.findByIdAndUpdate(
        authData.user._id,
        {
          $pull: { favorites: req.body.checkeditem},
        },
        { new: true }
      )
        .populate({path: "favorites", populate: {path: ""}})
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});


router.post("/AddItem", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      // res.status(200).json(authData.user)
      //console.log(authData.user, "yolo");
      let item = req.body;
      item.userId = authData.user._id;
      Item.create(item).then((item) => {
        res.json({ item });
      });
    }
  });
});






















// Verify Token
function verifyToken(req, res, next) {
  //console.log('verify')
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.status(403)//.json({err:'not logged in'});
  }

}







module.exports = router;
