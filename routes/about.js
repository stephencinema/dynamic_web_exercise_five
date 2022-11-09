const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req, res) => {
  res.send(`<div><h1>About Page<h1><h2>This page is about<h2><div>`);
});

router.get("/me", (req, res) => {
  res.send([
    {
      id: "me",
      name: "Steph",
      message: "Hello",
    },
    {
      id: "not-me",
      name: "Someoneelse",
      message: "Bye",
    },
  ]);
});

module.exports = router;