let express = require("express");
let path = require("path");
let fs = require("fs");
let bodyParser = require("body-parser");
let app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/profile-picture", function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/3.jpeg"));
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
});

// Static user list for testing
let users = {
  1: {
    userid: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
  },
};

app.post("/update-profile", function (req, res) {
  let userObj = req.body;

  // Static logic to simulate a database update
  users[1] = {
    ...users[1],
    ...userObj,
  };

  // Send response
  res.send(users[1]);
});

app.get("/get-profile", function (req, res) {
  // Static logic to simulate a database fetch
  let response = users[1] || {};

  // Send response
  res.send(response);
});

// Start the server
let port = 3000;
app.listen(port, function () {
  console.log(`Server running on http://localhost:${port}`);
});
