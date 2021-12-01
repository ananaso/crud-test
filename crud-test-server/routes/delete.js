var express = require("express");
var knex = require("knex")(
  require("../knexfile")[process.env.NODE_ENV || "development"]
);
var router = express.Router();

router.delete("/", async function (req, res) {
  await knex("todoItems")
    .where("id", req.body.id)
    .del()
    .then((numRowsDel) => res.status(200).json(numRowsDel))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
