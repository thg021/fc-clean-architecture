import dotenv from "dotenv";
import { app } from "./express";
dotenv.config();
const port: number = Number(process.env.PORT) || 8089;

app.listen(port, () => {
  console.log(`Service listening on port ${port}...`);
});
