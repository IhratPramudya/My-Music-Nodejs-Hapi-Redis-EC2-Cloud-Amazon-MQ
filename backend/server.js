import app from "./src/app.js";
import { config } from "./src/config/index.js";
import prisma from "./src/config/db.js";

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log('Terhubung ke database postgreSQL');

        app.listen(config.port, () => {
             console.log(`Server Backend berjalan di http://localhost:${config.port} (${config.nodeEnv} mode)`);
        })
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1)
    }
}

startServer();