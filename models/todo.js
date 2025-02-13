const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
         type: String, 
         required: true
     },
     description: { 
        type: String
     },
     completed: { 
        type: Boolean, 
        default: false 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
     }
}, {
     timestamps: true
 });

const Todo = mongoose.model("Todo", TodoSchema);

module.exports=Todo;