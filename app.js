const express = require("express")
const app = express()
const fs = require("fs")
const port = 6570
const bodyParser = require("body-parser")
const util = require("util");
const db = require('./db')
const path = require("path")
const { log } = require("console")
const md5 = require('md5');
const crypto = require('crypto');


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('publicnew'));
app.use(express.static(path.join(__dirname, 'views')))



app.get('/home', (req, res) => {
    res.render("firstPage")
})

app.get('/register', (req, res) => {
    key = ""
    res.render("register", { key })
})

app.get('/login', (req, res) => {

    res.render("login")
})


app.post('/loginpage', async (req, res) => {
    var loggin = req.body.uname
    console.log(loggin);


    sql = `select userName, pass, salt from registration1 where userName = '${loggin}'`;
    console.log(sql);

    var [data] = await db.query(sql)
    console.log(data);


    if (data.length > 0) {
        var passss = req.body.password + data[0].salt
        console.log(passss);

        var finalpass = md5(passss)
        console.log(finalpass);

        if (data[0].pass == finalpass && data[0].userName == loggin) {
            console.log("Login Success!!");
            // res.render("login")
            res.render("main")
        }

        else {
            console.log("User not exist");
            // res.render("register")
            res.end("User doesn't exist")
        }
    }
    else {
        console.log("No such user");
        // res.render("register")
        res.end("No such user")
    }
    //     sql = `select userName, keyss from registration1 where userName = '${loggin}' and keyss = '${key}'`;
    //     var [data]  = await db.query(sql)
    //     console.log(data);
})

app.get('/cube', (req, res) => {
    res.render("cube_game")
})

app.get('/events', (req, res) => {
    res.render("events_form")
})

app.get('/jobform', (req, res) => {
    res.render("form_5")
})

app.get('/sort', (req, res) => {
    res.render("sort")
})

app.get('/tictactoe', (req, res) => {
    res.render("tic_tac_toe")
})

app.get('/stopwatch', (req, res) => {
    res.render("stpWatch")
})

app.get("/posts", (req, res) => {
    if (true) {
        res.render('allstudent')
    }
    // catch (error) {
    //     res.write("Try again!!")
    //     return res.end()
    // }

})

app.get("/pagination", (req, res) => {
    res.render("indexnew")
})

app.get("/pagination/:id", (req, res) => {
    if (true) {
        res.render('postdetails', { id: req.params.id })
    }
})

app.get('/kuku', (req, res) => {
    res.render("cube_game")
})

app.get('/posts/:id', (req, res) => {
    if (true) {
        res.render('post', { id: req.params.id })
    }
    // else (error) {
    //     res.write("Try again!!")
    //     return res.end()
    // }
})

// app.all("*", (req, res) => {
//     res.end("No data found in database... &#128560;")
// })
// console.log("hello");

app.get('/sqlinsert', (req, res) => {
    res.render('indexmysql');
});

app.post('/query', async (req, res) => {
    const sqlQuery = req.body.query;
    // db.query(sqlQuery, (err, results) => {
    // if (err) throw err;
    var [results] = await db.query(sqlQuery)
    res.render('result', { query: sqlQuery, results: results });
    // });
});

app.get('/validation', (req, res) => {
    res.render('validation.ejs');
})

app.post('/formvalidate', async (req, res) => {
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
})

// app.get('/formvalidate/:s_id', function (req, res) {
//     var userid = req.params.s_id;
//     if (userid) {
//         var sql = `select * from basic_details1 where s_id = '${userid}'`;
//         db.query(sql, function (err, data) {
//             if (err) throw err;
//             res.render('validation.ejs', { data: data[0] });
//         })
//     }
// })

app.get('/time', (req, res) => {
    res.render('date');
})

app.get('/cards', (req, res) => {
    res.render('cards');
})





app.get('/', (req, res) => {
    res.status(200);
    const username = 'Dixit Kaneriya';
    res.render("index", { username });
});

app.get('/form', (req, res) => {
    res.status(200);
    res.render("appli_form");
    // res.send("Welcome to Dixit's Server!!");
});

app.post('/details', (req, res) => {
    res.status(200);


    var userdata = req.body;
    console.log(userdata.fname);
    userdata.id = crypto.randomUUID();
    db.connect(function (err) {
        if (err) throw err;
        // con.query("SELECT * FROM customers", function (err, result, fields) {
        //   if (err) throw err;
        //   console.log(result);
        // });
        var sql = `INSERT INTO usser (fname, lname, age, address) VALUES('${req.body.fname}', '${req.body.lname}', '${req.body.age}','${req.body.Address1}') `;
        console.log("gidjd");
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    });

    var datasave = fs.readFileSync("data.json", "utf-8")

    var parsedata = JSON.parse(datasave);
    parsedata.push(userdata)

    fs.writeFileSync("data.json", JSON.stringify(parsedata), function (err) {
        if (err) throw err;
        console.log("File Saved")
    });
    // array = []
    res.render("details", { data: parsedata });
});

app.post("/more", (req, res) => {
    res.status(200);

    var fetchdata = req.body;
    var data = fs.readFileSync("data.json", "utf-8");
    console.log(JSON.stringify(req.body))
    var value = Object.keys(fetchdata).toString();
    var object = Object.values(data).toString();
    console.log(value);
    console.log(object);

    console.log("Deleted button has been clicked: " + req.body.buttonId)



    var data1 = JSON.parse(data)
    var pass

    data1.forEach(element => {
        if (element.id == value) {
            pass = element
        }
        else {
            console.log("Not a match")
        }
    });
    console.log(pass);
    res.render("dummy", { data: pass });
});

app.get('/exam', async (req, res) => {
    let recordperpage = 400;
    let totalrecords = 400;
    let query = `select students.id, students.firstName as Name, sum(exam.prilims_mark_th) as Theory, sum(exam.prilims_mark_pr) as Pracical, sum(exam.terminal_mark_th) as Theory_1, sum(exam.terminal_mark_pr) as Practical_1, sum(exam.final_marks_th) as Theory_2, sum(exam.final_marks_pr) as Practical_2 from students join exam where students.id = exam.id group by students.id;`;

    let pquery = util.promisify(db.query).bind(db);
    // let [result] = await pquery(query);
    var [result] = await db.query(query);

    res.render('examhtml', { data: result, total: totalrecords });
});

app.get('/more/:studentid', async (req, res) => {
    let recordperpage = 400;
    let totalrecords = 400;
    let studentid = req.params.studentid;

    let query = `select exam.id, exam.sub_id, sum(prilims_mark_pr + prilims_mark_th) as Total_Prelims, sum(terminal_mark_pr + terminal_mark_th) as Total_Terminal, sum(final_marks_pr + final_marks_th) as Total_Final,
    sum(prilims_mark_pr + prilims_mark_th + terminal_mark_pr + terminal_mark_th + final_marks_pr + final_marks_th) as Total_Marks from exam where id=${studentid} group by sub_id order by sub_id;`;

    let pquery = util.promisify(db.query).bind(db);
    // let [result] = await pquery(query);
    var [result] = await db.query(query);

    res.render('more', { data: result, total: totalrecords });
});

app.get('/newhtml/:page', async (req, res) => {


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

});

// app.post('/search', async(req,res) => {
//     try {
//         let id = req.body.id || "1";
//         let page = req.params.pageno || "1";
//         if(page>4 || page<1){
//         res.end('page not found')
//     }

//     let recordperpage = 50;
//     let totalrecords = 200;
//     let start = page * recordperpage - recordperpage;
//     page = Number(page);
//     let month = req.query.month || '12';
//     let who = 'filter';
//     let query = `select students.id, students.firstName, students.lastName, count(attendance1.statuss) as att , (count(attendance1.statuss)/(select count(distinct dates) from attendance1 where Month(dates) = '1'))*100 as pr from students join attendance1 where students.id = attendance1.id and attendance1.statuss = 'P' and students.id = ${id} and Month(attendance1.dates) = ${month} group by students.id limit ${recordperpage} offset ${start} ;`;


//     // console.log("hii");
//     // db.query(query, (error, result) => {
//     //     if(error) throw error;
//     var [result] = await db.query(query);
//         res.render('newhtml', {data: result, pageno: page, total: totalrecords, month: month, who: who});
//     // })
//     }
//     catch (error) {
//         res.write("Try Once more")
//         return res.end()
//     }
// })

app.get('/searchgrid', async (req, res) => {

    var search = req.query.textarea || " "
    console.log(search);
    var split = search.split(/[_^${]/)
    var afirstName = [];
    var alastName = [];
    var adob = [];
    var agender = [];
    for (i = 1; i < split.length; i++) {
        var index = search.indexOf(split[i])
        console.log(index);
        var symbolindex = index - 1;
        console.log(symbolindex);
        var char = search.charAt(symbolindex)
        console.log(char);

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
        console.log(lname);
        temp.push(lname);
    }

    if (adob.length > 0) {
        var birth = adob.join(" or ");
        console.log(birth);
        temp.push(birth);
    }

    if (agender.length > 0) {
        var gend = agender.join(" or ");
        console.log(gend);
        temp.push(gend);
    }

    if (temp.length > 0) {
        var querybody = " where " + temp.join(" and ");
    }
    console.log(querybody);
    console.log(querybody);

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
    console.log(sql);
    // db.query(sql, (err, result) => {
    var [result] = await db.query(sql)

    console.log(result);
    res.render("search", { data: result, displaynone })
    // })
});

app.get('/page', async (req, res) => {
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
});











app.get('/keycompare', async (req, res) => {
    var key = req.query.key
    console.log(key);
    sql = `select keyss, currentTime from registration1 where keyss = '${key}'`;
    console.log(sql);
    var time = new Date()

    var [data] = await db.query(sql)
    timedifferent = time - data[0].currentTime
    console.log(data);

    if (data[0].keyss == key && timedifferent < 15000) {

        console.log("register successfully");
        res.render("login");

    }
    else {
        key = ""
        console.log("register failed");
        res.render("register", { key })
    }

})

app.get('/forgetpass', (req, res) => {

    res.render("forgetpass")
})

app.post('/register', async (req, res) => {
    try {
        console.log(req.body);

        var data = req.body;
        var str = createRandomString(4)
        var user_keys = createRandomString(12)
        var password = req.body.md5password + str
        console.log(password);
        var md5pass = md5(password)
        console.log(md5pass);

        var confirmPass = req.body.cpassword + str
        console.log(confirmPass);
        var cpass = md5(confirmPass);

        console.log(cpass);



        function createRandomString(length) {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let resultSalt = "";
            for (let i = 0; i < length; i++) {
                resultSalt += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return resultSalt;
        }

        // 
        // console.log(createRandomString(4))


        let inquery = `insert into registration1 (firstName, email, mobile, userName, pass, conPass, salt, keyss) values('${req.body.fname}','${req.body.email}','${req.body.number}','${req.body.uname}','${md5pass}','${cpass}', '${str}', '${user_keys}')`;
        // console.log(inquery);


        // s_id = result.insertId;
        // console.log(s_id);

        // var [data] = await db.query(inquery)

        //    res.render("login")
        //   await  db.query(inquery, function (error, result) {

        //         // call(result.insertId)


        //         // return res.end("Data generated whoo!!");
        //     });
        var [data] = await db.query(inquery)
        // console.log( "vhfgh" + data.insertId);
        res.render("register", { key: user_keys })

    }
    catch (error) {
        return res.write("Try again please")
    }
})



app.listen(port, () => {
    console.log(`listening port ${port}`);
})