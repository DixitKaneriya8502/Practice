const db = require('../../db')
const md5 = require("md5")
const util = require("util");

exports.attendance = async (req, res) => {


  let page = req.params.page || 1;

  console.log(page);
  if (page > 4 || page < 1) {
      res.end('page not found')
  }

  let recordperpage = 50;
  let totalrecords = 200;
  page = Number(page);
  console.log(page);
  let start = page * recordperpage - recordperpage;

  // console.log(start);

  let field = req.query.orderby || 'id'
  let orderdir = req.query.orderdir || 'asc'
  let month = req.query.month || '12';
  let who = 'newhtml';
  let query = `select students.id, students.firstName, students.lastName, count(attendance1.statuss) as att , (count(attendance1.statuss)/(select count(distinct dates) from attendance1 where Month(dates) = '1'))*100 as pr from students join attendance1 where students.id = attendance1.id and attendance1.statuss = 'P' and Month(attendance1.dates) = ${month} group by students.id, students.firstName order by ${field} ${orderdir} limit ${recordperpage} offset ${start} ;`

  // let pquery = util.promisify(db.query).bind(db);
  // let result = await pquery(query);
  var [result] = await db.query(query)
  // console.log(result);

  res.render('newhtml', { data: result, start: start, pageno: page, total: totalrecords, month: month, who: who });

}

exports.exam = async (req, res) => {
  let recordperpage = 400;
  let totalrecords = 400;
  let query = `select students.id, students.firstName as Name, sum(exam.prilims_mark_th) as Theory, sum(exam.prilims_mark_pr) as Pracical, sum(exam.terminal_mark_th) as Theory_1, sum(exam.terminal_mark_pr) as Practical_1, sum(exam.final_marks_th) as Theory_2, sum(exam.final_marks_pr) as Practical_2 from students join exam where students.id = exam.id group by students.id;`;

  let pquery = util.promisify(db.query).bind(db);
  // let [result] = await pquery(query);
  var [result] = await db.query(query);

  res.render('examhtml', { data: result, total: totalrecords });
}

exports.examdata = async (req, res) => {
  let recordperpage = 400;
  let totalrecords = 400;
  let studentid = req.params.studentid;

  let query = `select exam.id, exam.sub_id, sum(prilims_mark_pr + prilims_mark_th) as Total_Prelims, sum(terminal_mark_pr + terminal_mark_th) as Total_Terminal, sum(final_marks_pr + final_marks_th) as Total_Final,
  sum(prilims_mark_pr + prilims_mark_th + terminal_mark_pr + terminal_mark_th + final_marks_pr + final_marks_th) as Total_Marks from exam where id=${studentid} group by sub_id order by sub_id;`;

  let pquery = util.promisify(db.query).bind(db);
  // let [result] = await pquery(query);
  var [result] = await db.query(query);

  res.render('more', { data: result, total: totalrecords });
}

// exports.examdetails = (req, res) => {
//   res.status(200);

//   var fetchdata = req.body;
//   var data = fs.readFileSync("data.json", "utf-8");
//   console.log(JSON.stringify(req.body))
//   var value = Object.keys(fetchdata).toString();
//   var object = Object.values(data).toString();
//   console.log(value);
//   console.log(object);

//   console.log("Deleted button has been clicked: " + req.body.buttonId)



//   var data1 = JSON.parse(data)
//   var pass

//   data1.forEach(element => {
//     if (element.id == value) {
//       pass = element
//     }
//     else {
//       console.log("Not a match")
//     }
//   });
//   console.log(pass);
//   res.render("dummy", { data: pass });
// }