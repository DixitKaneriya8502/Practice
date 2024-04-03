const {db} = require("../../db")
const md5 = require("md5")


exports.tic_tac_toe = (req, res) => {
  res.render("tic_tac_toe")
}