const express = require("express")
const app = express()
const port = 6570
const bodyParser = require("body-parser")
const db = require('./db')
const path = require("path")
const { log } = require("console")
const md5 = require('md5');


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}))
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

app.get('/kuku', (req, res) => {
    res.render("cube_game")
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
            res.end("Login Success!!")
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