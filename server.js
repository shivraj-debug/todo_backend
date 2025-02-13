const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/db.js");
const authroutes=require("./routes/authroutes.js");
const todoroutes=require("./routes/todoroutes.js")

dotenv.config();
connectDB();

const PORT=process.env.PORT || 3000
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authroutes );
app.use("/api/todos",todoroutes);

// global error handler
const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: err.message || "Internal Server Error" });
};
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
