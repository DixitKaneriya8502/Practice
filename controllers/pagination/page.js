const db = require('../../db')
const md5 = require("md5")

exports.paginate = async (req, res) => {
  let sql = 'SELECT * FROM student10 limit 50000';
  // con.query(sql, (err, result) => {
  // if (err) throw err;
  var [result] = await db.query(sql)
  const numOfResults = result.length;
  const resultsPerPage = 200;
  console.log(numOfResults);
  const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
  console.log(numberOfPages);
  let page = req.query.page ? Number(req.query.page) : 1;
  console.log(page);
  if (page > numberOfPages) {
      res.redirect('/page?page=' + encodeURIComponent(numberOfPages));
  } else if (page < 1) {
      res.redirect('/page?page=' + encodeURIComponent('1'));
  }
  //Determine the SQL LIMIT starting number
  const startingLimit = (page - 1) * resultsPerPage;
  //Get the relevant number of POSTS for this starting page
  sql = `SELECT * FROM student10 ORDER BY lastname LIMIT ${startingLimit},${resultsPerPage}`;
  // db.query(sql, (err, result) => {
  // if (err) throw err;
  var [result] = await db.query(sql)
  let iterator = (page - 5) < 1 ? 1 : page - 5;
  let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
  if (endingLink < (page + 4)) {
      iterator -= (page + 4) - numberOfPages;
  }
  res.render('comp', { data: result, page, iterator, endingLink, numberOfPages });
  // });
  // });
}