const db = require('../../db')
const md5 = require("md5")

exports.dynamicsearch = async (req, res) => {

  var search = req.query.textarea || ""
  console.log(search);
  
  var split = search.split(/[_^${]/)
  var afirstName = [];
  var alastName = [];
  var adob = [];
  var agender = [];
  for (i = 1; i < split.length; i++) {
      var index = search.indexOf(split[i])
    //   console.log(index);
      var symbolindex = index - 1;
    //   console.log(symbolindex);
      var char = search.charAt(symbolindex)
    //   console.log(char);

      if (char == "_") {
          afirstName.push(`firstName like '${split[i]}%'`);
      }
      else if (char == "^") {
          alastName.push(`lastName like '${split[i]}%'`);
      }
      else if (char == "$") {
          adob.push(`dob = '${split[i]}'`);
      }
      else if (char == "{") {
          agender.push(`gender like '${split[i]}%'`);
      }
      else {
          console.log("No Match");
      }
  }


  var temp = []
  if (afirstName.length > 0) {
      var fname = afirstName.join(" or ");
      console.log(fname);
      temp.push(fname);
  }

  if (alastName.length > 0) {
      var lname = alastName.join(" or ");
    //   console.log(lname);
      temp.push(lname);
  }

  if (adob.length > 0) {
      var birth = adob.join(" or ");
    //   console.log(birth);
      temp.push(birth);
  }

  if (agender.length > 0) {
      var gend = agender.join(" or ");
    //   console.log(gend);
      temp.push(gend);
  }

  if (temp.length > 0) {
      var querybody = " where " + temp.join(" and ");
  }
  console.log(querybody);
  // console.log(querybody);

  // db.connect(function(err) {
  // if(err) {
  //     console.log("error occured"); 
  // };

  console.log("Connected");
  
  if (!req.query.textarea) {
      var sql = "select * from students"
  }
  else if (temp.length != 0) {
      sql = `select * from students ${querybody}`
  }
  else {
      var displaynone = 0;
  }
  // console.log(sql);
  // db.query(sql, (err, result) => {
  var [result] = await db.query(sql)

  // console.log(result);
  res.render("search", { data: result, displaynone })
  // })
}