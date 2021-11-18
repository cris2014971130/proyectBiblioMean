import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import book from "./routes/book.js";
import client from "./routes/client.js";
import provider from "./routes/provider.js";
import rol from "./routes/role.js";
dotenv.config(); //inicializa las variables de entorno

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/book",book);
app.use("/api/client",client);
app.use("/api/provider",provider);
app.use("/api/rol",rol);

app.listen(process.env.PORT, () =>
  console.log("Backend server running on port " + process.env.PORT)
);

db.dbConnection();
