import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import itemRoutes from "./routes/item.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// allow JSON data in the req.body:
app.use(express.json());

app.use("/api/items", itemRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});