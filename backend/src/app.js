import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/index.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middlewares
app.use(cors({ origin: config.nodeEnv === "production" ? "https://your-production-url.com" : "*" }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);


// Basic Route
app.get('/', (req, res) => {
    res.send('API Autentikasi Berjalan!');
})


// Global Error Handler (Opasional, bisa lebih detail)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Ada yang salah di server!');
})

export default app;