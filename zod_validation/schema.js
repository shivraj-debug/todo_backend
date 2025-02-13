const { z } = require("zod");

const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(30),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const todoSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
});

module.exports = { signupSchema, loginSchema, todoSchema };
