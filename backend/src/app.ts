import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import setupRoutes from "./routes";
import path from "path";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
