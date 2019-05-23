"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const cors_1 = __importDefault(require("cors"));
const request_promise_1 = __importDefault(require("request-promise"));
app.use(cors_1.default({
    origin: "http://localhost:3000"
}));
// Get location of user
app.get("/", (req, res) => {
    request_promise_1.default({ method: "GET", uri: "https://freegeoip.app/json/" })
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
        request_promise_1.default({ method: "GET", uri: `https://freegeoip.app/json/${req.params.ip + req.params[0]}` })
            .then((response) => {
            res.send(response);
        })
            .catch((err) => {
            // tslint:disable-next-line:no-console
            console.log(err);
        });
    }
});
const port = 8000;
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log("Listening...");
    // tslint:disable-next-line:no-console
    console.log(`port ${port}`);
});
//# sourceMappingURL=index.js.map