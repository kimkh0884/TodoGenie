const router = require("express").Router();
const User = require("../models/user");

router.get("/", (req, res) => {
    console.log("hello");
    User.findAll()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => res.status(500).send(err));
});

module.exports = router;