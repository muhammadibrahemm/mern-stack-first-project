const {z} = require("zod");


const signupSchema = z.object(
    {
        username: z
        .string({required_error: "username is required"})
        .trim()
        .min(3, {message: "username must be atleast 3 chars"})
        .max(255, {message: "username must not be more than 255 chars"}),

        email: z
        .string({required_error:"email is required"})
        .trim()
        .email({message: "invalid email address"})
        .min(3, {message: "email must be atleast of 3 chars"})
        .max(255, {message: "email must not be more than 255 chars"}),

        phone: z
        .string({required_error:"phone is required"})
        .trim()
        .min(10, {message: "phone must be atleast of 10 chars"})
        .max(20, {message: "phone must not be more than 20 chars"}),

        password: z
        .string({required_error:"password is required"})
        .min(7, {message: "password must be atleast of 6 characters"})
        .max(1024, "password can't be greater than 1024 characters"),
    }
)

const loginSchema = z.object(
    {
        email: z
        .string({required_error:"email is required"})
        .trim()
        .email({message: "invalid email address"})
        .min(3, {message: "email must be atleast of 3 chars"})
        .max(255, {message: "email must not be more than 255 chars"}),

        password: z
        .string({required_error:"password is required"})
        .min(7, {message: "password must be atleast of 6 characters"})
        .max(1024, "password can't be greater than 1024 characters"),
    }
)

module.exports = {
    signupSchema,loginSchema
}