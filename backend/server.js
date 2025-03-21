import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import itemRoutes from "./routes/item.route.js";

dotenv.config();

const app = express();

// allow JSON data in the req.body:
app.use(express.json());

app.use("/api/items", itemRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});