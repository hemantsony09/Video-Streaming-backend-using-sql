import express from "express";
import cors from "cors";
import sequelize from "./db/config.js";
import authRoutes from "./routes/auth.js";
import videoRoutes from "./routes/videos.js";

const app = express();

app.use(cors());
await sequelize.sync({ alter: true }); // In server.js
console.log("Database synced successfully!");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/auth", authRoutes);
app.use("/videos", videoRoutes);

await sequelize.sync();
console.log("Database synced successfully!");

app.listen(8000, () => console.log("Server running on port 8000"));
