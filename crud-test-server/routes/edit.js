var express = require("express");
var knex = require("knex")(
  require("../knexfile")[process.env.NODE_ENV || "development"]
);
var router = express.Router();

router.patch("/", async function (req, res) {
  await knex("todoItems")
    .where("id", req.body.id)
    .update("name", req.body.name, ["id", "name"])
    .then((updatedItem) => res.status(200).json(updatedItem))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
