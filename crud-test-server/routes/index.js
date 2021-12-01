var express = require("express");
var knex = require("knex")(
  require("../knexfile")[process.env.NODE_ENV || "development"]
);
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res) {
  await knex
    .column("id", "name")
    .select()
    .from("todoItems")
    .then((items) => res.status(200).json(items))
    .catch((err) => res.status(500).json(err));
});

// router.delete("/", async function (req, res) {
//   await knex.
// })

module.exports = router;
