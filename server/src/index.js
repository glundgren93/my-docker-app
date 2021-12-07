const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const TodosController = require("./controllers/todosController");

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use(cors());
const todosController = new TodosController();

app.get("/todos", todosController.get);
app.post("/todo", todosController.post);
app.put("/todo", todosController.put);

app.listen(9000);
