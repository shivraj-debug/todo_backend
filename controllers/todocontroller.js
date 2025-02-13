const Todo = require("../models/todo");
const {todoSchema} =require("../zod_validation/schema")

exports.createTodo = async (req, res) => {
    const {title,description,completed}=req.body;

    const {success}=todoSchema.safeParse(req.body);

        if(!success){
            return res.status(411).json({
                message:"chekc input type"
            })
        }

    try {
        const newTodo = new Todo({ user: req.user.id, 
                                title,
                                description,
                                completed
                            });

        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: "Error while creating todo", error });
    }
};

exports.getTodos = async (req, res) => {
    const id=req.user.id
    try {
        const todos = await Todo.find({ user: id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error while fetching todos", error });
    }
};

exports.updateTodo = async (req, res) => {

    const todo_id=req.params.id;
    try {
        const todo = await Todo.findById(todo_id);

        const id=todo.user.toString() !== req.user.id;

        if(id){
            return res.json({
                message:"you are not authorized to access this todo"
            })
        }

        if (!todo)
            return res.status(403).json({ message: "there is no todo with given id" })

        Object.assign(todo, req.body);
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Error updating todo", error });
    }
};

exports.deleteTodo = async (req, res) => {
    const todo_id=req.params.id
    try {
        const todo = await Todo.findById(todo_id);
       
        const id=todo.user.toString() !== req.user.id;

        if(id){
            return res.json({
                message:"you are not authorized to delete this todo"
            })
        }

        if (!todo)
            return res.status(403).json({
                      message: "there is no todo with given id" 
                    })

        await todo.deleteOne();
        res.json({ message: "Todo deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error while deleting todo", error });
    }
};
