const express = require("express")
const app = express()
const fs = require("fs")
const port = 6570
const bodyParser = require("body-parser")
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