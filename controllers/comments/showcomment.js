const db = require('../../db')
const md5 = require("md5")


exports.comment = (req, res) => {
  if (true) {
      res.render('allstudent')
  }
}

exports.number = (req, res) => {
  if (true) {
      res.render('post', { id: req.params.id })
  }
  // else (error) {
  //     res.write("Try again!!")
  //     return res.end()
  // }
}