const express = require("express");
const { createTodo, getTodos, updateTodo, deleteTodo } = require("../controllers/todocontroller");
const authMiddleware = require("../middleware/authmiddleware");
const router = express.Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

module.exports = router;
