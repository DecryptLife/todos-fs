const router = require("express").Router();
const dotenv = require("dotenv");
const isVerified = require("../middleware/isVerified");
console.log("In todo router");

dotenv.config();

const todos = [];

router.get("/", (req, res) => {
  console.log("TODOS: ", process.env.JWT_SECRET);
  res.send(todos);
});

router.post("/", isVerified, (req, res) => {
  console.log("New todo server called");
  const newTodo = { ...req.body, id: req.user.id };

  todos.push(newTodo);
  res.send(newTodo);
});

router.delete("/:todoId", isVerified, (req, res) => {
  console.log(req.params);
  const id = req.params.todoId;
  console.log(id);
  const todoId = parseInt(id);

  // check if user owns todo

  const index = todos.findIndex((todo) => {
    return parseInt(todo.id) === parseInt(todoId);
  });

  if (parseInt(todos[index].userId) !== parseInt(req.user.id)) {
    return res
      .status(401)
      .send({ message: "Can't update/delete todo owned by another user" });
  }
  if (index === -1) {
    res
      .status(400)
      .send({ message: `Todo with id: ${todoId} does not exists` });

    return;
  } else {
    todos.splice(index, 1);
    res.send({ message: "success" });
  }
});

router.patch("/:todoId", isVerified, (req, res) => {
  const id = req.params.todoId;
  const todoId = parseInt(id);
  const partialTodo = req.body.content;

  const index = todos.findIndex((todo) => {
    return parseInt(todo.id) === parseInt(todoId);
  });

  console.log(index);

  if (parseInt(todos[index].userId) !== parseInt(req.user.id)) {
    return res
      .status(401)
      .send({ message: "Can't update/delete todo owned by another user" });
  }

  if (index === -1) {
    res.status(400).send({ message: `Todo with id: ${todoId} does not exist` });
    return;
  } else {
    todos[index].content = partialTodo;
    res.send({ message: "todo updated successfully" });
  }
});

module.exports = router;
