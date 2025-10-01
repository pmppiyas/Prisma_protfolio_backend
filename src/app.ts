import compression from "compression";
import cors from "cors";
import express, { type Application, type NextFunction } from "express";
import router from "./routes/index.js";

const app: Application = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use("/api/v1", router);

app.use((req, res, _next: NextFunction) => {
  res.status(404).send({
    succuss: false,
    message: "Route not found",
  });
});

export default app;
