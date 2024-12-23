import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import roleRoutes from "./routes/role.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import marketplaceRoutes from "./routes/marketplace.routes.js";

import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", roleRoutes);
app.use("/api", productRoutes);
app.use("/api", marketplaceRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint Not Found." });
});

export default app;
