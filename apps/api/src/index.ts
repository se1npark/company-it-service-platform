import "dotenv/config";
import { createApp } from "./app.js";

const port = Number(process.env.API_PORT ?? 4000);
const app = createApp();

app.listen(port, () => {
  console.log(`Company IT Service API running on http://localhost:${port}`);
});

