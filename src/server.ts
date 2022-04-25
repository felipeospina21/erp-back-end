import dotenv from "dotenv";
import { app } from "./app";
import { connectDB } from "./database";

dotenv.config();
const port = process.env.PORT;
connectDB();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
