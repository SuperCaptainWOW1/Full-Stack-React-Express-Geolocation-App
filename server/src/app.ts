import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import request from "request-promise";

app.use(cors({
  origin: "http://localhost:3000"
}));

// Get location of user
app.get("/", (req: Request, res: Response) => {
  request({ method: "GET", uri: "https://freegeoip.app/json/" })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get location of custom ip
app.get("/:ip*", (req: Request, res: Response) => {
  if (req.params.ip + req.params[0] !== "favicon.ico") {
    request({ method: "GET", uri: `https://freegeoip.app/json/${req.params.ip + req.params[0]}` })
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

const port: number = 8000;

app.listen(port, () => {
  console.log("Listening...");
  console.log(`port ${port}`);
});
