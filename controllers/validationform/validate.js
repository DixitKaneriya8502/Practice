const db = require('../../db')
const md5 = require("md5")

exports.validateform = (req, res) => {
  res.render('validation.ejs');
}

exports.validateformdata = async (req, res) => {
  try {
      console.log(req.body);


      let inquery = `insert into basic_details1 (fname, lname, email, address1, address2, gender, city, state, bday, zipcode, rstatus) values('${req.body.fname}','${req.body.lname}','${req.body.email}','${req.body.address1}','${req.body.address2}','${req.body.gender}','${req.body.city}','${req.body.state}','${req.body.bday}','${req.body.zipcode}','${req.body.rstatus}')`;
      console.log(inquery);


      // s_id = result.insertId;
      // console.log(s_id);

      // db.query(inquery, function (error, result) {

      //     call(result.insertId)
      var [results] = await db.query(inquery)

      return res.end("Data generated whoo!!");
  }

  catch (error) {
      return res.write("Try again please")
  }


  function call(s_id) {

      try {

          let boardNamenew = req.body.board
          let pyear = req.body.pyear
          let percentage = req.body.percentage

          // let inquery2;

          for (i = 0; i < boardNamenew.length; i++) {
              console.log(req.body);
              let inquery2 = `insert into edu_details (s_id, boardName, passyear, percent) values('${s_id}','${boardNamenew[i]}','${pyear[i]}','${percentage[i]}')`;
              console.log(inquery2);


              console.log("print");
              db.query(inquery2, function (error, result) {
                  // console.log(inquery2);
                  return res.end("Data generated!!");
              });
          }
      }

      catch (error) {
          return res.write("Try again!!")
      }

      // try {
      //     let comp = req.body.CompanyName
      //     let post = req.body.designation
      //     let jdate = req.body.joiningDate
      //     let edate = req.body.endingDate

      //     for (j=0; j<comp.length; j++) {
      //         console.log(re.body);
      //         let inquery3 = `insert into work_experience (s_id, comp, desi, jdate, edate) values('${s_id}','${comp[j]}','${post[j]}','${jdate[j]}','${edate[j]}')`;
      //         console.log(inquery3);

      //         db.query(inquery3, function(error, result) {
      //             return res.end("Data generated!!");
      //         })
      //     }
      // }
      // catch (error) {
      //     return res.write("Try again !!")
      // }

  }


  // function call(s_id) {
  //     try {

  //         let boardName = req.body.board
  //         let pyear = req.body.pyear
  //         let percentage = req.body.percentage

  //         let inquery2;
  //         // for (i = 0; i < boardName.length; i++) {
  //         inquery2 = `insert into education_details (s_id, board, pyear, percentage) values('${s_id}','${boardName}','${pyear}','${percentage}')`;
  //         console.log(inquery2);

  //         db.query(inquery2, function (error, result) {
  //             return res.end("Data generated!!");
  //         });
  //         // }
  //     }

  //     catch (error) {
  //         return res.write("Try again")
  //     }

  // }
  console.log("ello");
}