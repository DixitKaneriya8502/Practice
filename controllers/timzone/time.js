const db = require('../../db')
const md5 = require("md5")

exports.timedata = (req, res) => {
  res.render('date');
}