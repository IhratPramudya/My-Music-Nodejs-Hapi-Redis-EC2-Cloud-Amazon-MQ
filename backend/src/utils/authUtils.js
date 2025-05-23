
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const comparePassword = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
}

const generateToken = (userId) => {
    return jwt.sign({ id: userId}, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn
    })
}


export { hashPassword, comparePassword, generateToken }