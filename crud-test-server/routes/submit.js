var express = require("express");
var knex = require("knex")(
  require("../knexfile")[process.env.NODE_ENV || "development"]
);
var router = express.Router();

router.post("/", async function (req, res) {
  await knex("todoItems")
    .insert(req.body, ["id", "name"])
    .then((insertedRow) => res.status(200).json(insertedRow[0].name))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
