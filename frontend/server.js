const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  // key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  // cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
  // ca : fs.readFileSync(path.join(__dirname, "backend-cert.pem"))
};

app.prepare().then(() => {
  // Create a server to consume requests
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);

    // Pass the request and response to Next.js
    // Let Next.js handle the request and response
    handle(req, res, parsedUrl);
  }).listen(3000, () => {
    console.log("Server running at https://localhost:3000");
  });
});
