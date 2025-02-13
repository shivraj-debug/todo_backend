const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {signupSchema, loginSchema}=require("../zod_validation/schema")

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const {success}=signupSchema.safeParse(req.body);

        if(!success){
            return res.status(411).json({
                message:"chekc input type"
            })
        }

        const user = await User.findOne({ email })

        if(user) {
            return res.status(409).json({
                message:"user already exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, 
                                   email,
                                   password: hashedPassword 
                            });
        await newUser.save();

        res.status(201).json({ message: "signup successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error while signup", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const {success}=loginSchema.safeParse(req.body);

        if(!success){
            return res.status(411).json({
                message:"chekc input type"
            })
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "user does not exist" });
        }

        const credential=await bcrypt.compare(password, user.password)

        if(!credential){
            return res.status(401).json({
                message:"please enter correct password"
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error while logging ", error });
}
};
