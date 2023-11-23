const express = require("express");

const teamsRouter = require("./teams/teams-router");

const server = express();

server.use(express.json());

server.use("/api/teams", teamsRouter);

server.get("/", (req, res) => {
  // console.log(process.env);
  res.status(200).json({ apu: "up" });
});

module.exports = server;
