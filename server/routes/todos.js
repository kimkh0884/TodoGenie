const router = require("express").Router();
const Todo = require("../models/todo");

router.get("/", (req, res) => {
    Todo.findAll()
      .then((todos) => {
        res.send(todos);
      })
      .catch((err) => res.status(500).send(err));
});

router.post("/", (req, res) => {
    const todoInfo = req.body;
    console.log(req);
    if(req.session.passport) {
        todoInfo.owner = req.session.passport.user;
    } else {
        todoInfo.owner = "Anonymous";
    }
    Todo.create(todoInfo)
      .then((todo) => res.send(todo))
      .catch((err) => res.status(500).send(err));
  });

module.exports = router;