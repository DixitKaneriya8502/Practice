const db = require('../../db')
const md5 = require("md5")


exports.event = (req, res) => {
  res.render("events_form")
}