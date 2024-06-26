import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import setupRoutes from "./routes";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
