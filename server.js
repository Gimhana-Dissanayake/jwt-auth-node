require("dotenv").config();

const express = require("express");

const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [
  { username: "Jimmy", title: "post 1" },
  { username: "Malan", title: "post 2" },
];
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.sendStatus(403);
    console.log(user);
    req.user = user;
    next();
  });
};

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.listen(3000);
