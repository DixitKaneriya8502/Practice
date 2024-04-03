const db = require('../../db')
const md5 = require("md5")

exports.card = (req, res) => {
  res.render('cards');
}