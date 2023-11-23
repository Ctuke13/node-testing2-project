const router = require("express").Router();

const Teams = require("./teams-model");

router.get("/", (req, res) => {
  Teams.getAll()
    .then((teams) => {
      console.log(teams);
      res.status(200).json(teams);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Teams.getById(id)
    .then((team) => {
      console.log(team);
      res.status(200).json(team);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", async (req, res) => {
  res.status(201).json(await Teams.insert(req.body));
});

router.put("/:id", (req, res) => {
  Teams.update(req.params.id, req.body)
    .then((team) => {
      console.log(team);
      res.status(200).json(team);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  Teams.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: `Project ${req.params.id} has been deleted.`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
