import prisma from "../config/db.js";
import { hashPassword, comparePassword, generateToken } from "../utils/authUtils.js";

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await prisma.user.findUnique({
            where: { email }
        });

        if (userExists) {
            return res.status(400).json({ message: "Email sudah terdaftar" });
        }

        const hashedPassword = await hashPassword(password);;

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        });

        res.status(201).json({
            id: user.id,
            email: user.email,
            token: generateToken(user.id),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Gagal login", error: error.message })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if(user && (await comparePassword(password, user.password))) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                token: generateToken(user.id),
            });
        }
    } catch(error) {
        console.log("Error logging in user:", error);
        res.status(500).json({ message: "Gagal login", error: error.message });
    }
}

const getUserProfile = async (req, res) => {
    res.json(req.user);
}

export { registerUser, loginUser, getUserProfile };