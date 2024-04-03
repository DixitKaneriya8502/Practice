const db = require('../../db')
const md5 = require("md5")

exports.route = (req, res) => {
  res.status(200);
  const username = 'Dixit Kaneriya';
  res.render("index", { username });
}