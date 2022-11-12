const router = require("express").Router();
const Todo = require("../models/todo");

router.get("/", (req, res) => {
    Todo.findAll(req.session.userId)
      .then((todos) => {
        res.send(todos);
      })
      .catch((err) => res.status(500).send(err));
});

router.post("/", (req, res) => {
    const body = req.body;
    Todo.create({
      title: body.title,
      owner: req.session.userId,
      start: body.start,
      end: body.end,
      state: 'UNDONE'
    })
      .then((todo) => res.send(todo))
      .catch((err) => res.status(500).send(err));
  });

router.put("/:todoId", (req, res) => {
    Todo.findOneById(req.params.todoId)
      .then((todo) => {
          todo.title = req.body.title;
          todo.start = req.body.start;
          todo.end = req.body.end;
          todo.save();
          res.send(todo);
      })
      .catch((err) => res.status(500).send(err));
});

router.delete("/:todoId", (req, res) => {
    Todo.deleteById(req.params.todoId)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
});

router.get("/recommendation", (req, res) => {
  const day = req.query.day;
  const time = req.query.time;
  if(time) {
    const chunks = time.split("-");
    const start = chunks[0];
    const end = chunks[1];
  }
  Todo.findAll()
    .then((todos) => {
      res.send(todos);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;