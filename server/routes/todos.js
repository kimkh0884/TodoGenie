const router = require("express").Router();
const Todo = require("../models/todo");
const cors = require('cors');
router.use(cors({origin: true, credentials: true}));


router.get("/", (req, res) => {
    const startDate = req.query.start;
    const endDate = req.query.end;
    
    if(startDate && endDate) {
      Todo.findByTime(req.session.userId, startDate, endDate)
      .then((todos) => {
        res.send(todos);
      })
      .catch((err) => res.status(500).send(err));
    } else {      
      Todo.findAll(req.session.userId)
      .then((todos) => {
        res.send(todos);
      })
      .catch((err) => res.status(500).send(err));
    }
});

router.post("/", (req, res) => {
    const body = req.body;
    if(body.start) {
      Todo.create({
        title: body.title,
        owner: req.session.userId,
        start: body.start,
        end: body.end,
        state: 0 
      })
      .then((todo) => res.send(todo))
      .catch((err) => res.status(500).send(err));
    } else {
      Todo.create({
        title: body.title,
        owner: req.session.userId,
        end: body.end,
        state: 0
      })
      .then((todo) => res.send(todo))
      .catch((err) => res.status(500).send(err));
    }
  });

router.put("/:todoId", (req, res) => {
    Todo.findOneById(req.params.todoId)
      .then((todo) => {
          if(req.body.title) {
            todo.title = req.body.title;
          }
          if(req.body.todo) {
            todo.start = req.body.start;
          } 
          if(req.body.end) {
            todo.end = req.body.end;
          }
          if(req.body.state) {
            todo.state = req.body.state;
          }
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

router.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  if(keyword == null) keyword = "";

  Todo.search(keyword)
    .then((todos) =>  {
        res.send(todos);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;