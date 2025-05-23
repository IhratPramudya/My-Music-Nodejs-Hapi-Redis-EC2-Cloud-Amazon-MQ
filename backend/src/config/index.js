
// backend/src/config/index.js

import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    nodeEnv: process.env.NODE_ENV || 'development',
    // ...Configurasi aws lainnya
}