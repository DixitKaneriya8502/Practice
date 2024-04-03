const db = require('../../db')
const md5 = require("md5")


exports.kuku = (req, res) => {
  res.render("cube_game")
}