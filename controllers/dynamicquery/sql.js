const db = require('../../db')
const md5 = require("md5")


exports.sqlquery = (req, res) => {
  res.render('indexmysql');
} 

exports.sqldata = async (req, res) => {
  const sqlQuery = req.body.query;
  // db.query(sqlQuery, (err, results) => {
  // if (err) throw err;
  var [results] = await db.query(sqlQuery)
  res.render('result', { query: sqlQuery, results: results });
  // });
}