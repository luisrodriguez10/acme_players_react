const express = require("express");
const app = express();
const path = require("path");
const { seeder, Player } = require("./db");

app.use(express.json());
app.use("/dist", express.static("dist"));
app.use("/assets", express.static("assets"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/api/players", async (req, res, next) => {
  try {
    res.send(await Player.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/players/:id", async (req, res, next) => {
    try {
      res.send(await Player.findByPk(req.params.id));
    } catch (ex) {
      next(ex);
    }
  });

app.post("/api/players", async (req, res, next) => {
  try {
    res.status(201).send(await Player.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete(`/api/players/:id`, async(req, res, next) => {
    try {
        const player = await Player.findByPk(req.params.id);
        await player.destroy();
        res.sendStatus(204);
    } catch (ex) {
        next(ex)
;    }
})

app.use((err, req, res, next) => {
    res.status(500).send({error: err.message});
})

const init = async () => {
  await seeder();
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`app listening on port ${port}`));
};

init();
