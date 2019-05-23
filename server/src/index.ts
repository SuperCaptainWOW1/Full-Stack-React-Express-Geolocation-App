import express from "express";
const app = express();
import cors from "cors";
import request from "request-promise";

app.use(cors({
  origin: "http://localhost:3000"
}));

// Get location of user
app.get("/", (req, res) => {
  request({ method: "GET", uri: "https://freegeoip.app/json/" })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      // tslint:disable-next-line:no-console
      console.log(err);
    });
});

// Get location of custom ip
app.get("/:ip*", (req, res) => {
  if (req.params.ip + req.params[0] !== "favicon.ico") {
    request({ method: "GET", uri: `https://freegeoip.app/json/${req.params.ip + req.params[0]}` })
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        // tslint:disable-next-line:no-console
        console.log(err);
      });
  }
});

const port: number = 8000;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log("Listening...");
  // tslint:disable-next-line:no-console
  console.log(`port ${port}`);
});
