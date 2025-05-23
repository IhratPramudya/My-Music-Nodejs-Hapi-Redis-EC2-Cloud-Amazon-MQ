
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import prisma from '../config/db.js';
    
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, config.jwtSecret);

            req.user = await prisma.user.findUnique({
                where: { id: decoded.id },
                select: { id: true, email: true }   
            });

            if (!req.user) {
                return res.status(401).json({ message: "Tidak diizinkan pengguna tidak ditemukan" });
            } 

            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: "Tidak diizinkan token Gagal" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Tidak diizinkan token tidak ada" });
    }
}

export { protect };