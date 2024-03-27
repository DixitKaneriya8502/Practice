const express = require("express")
const app = express()
const port = 6580
const bodyParser = require("body-parser")
const session = require('express-session');
const db = require('long/umd/views/db')
const path = require("path")
const { log } = require("console")
const md5 = require('md5');
// md5(password+salt)

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'views')))



app.get('/home', (re, res) => {
    res.render("firstPage")
})

app.get('/register', (req, res) => {
    res.render("register")
})

app.get('/login', (req, res) => {
    res.render("login")
})

app.get('/forgetpass', (req, res) => {
    res.render("forgetpass")
})

app.post('/registration', (req, res) => {
    try {
        console.log(req.body);

        var data = req.body;
        var password = req.body.md5password + createRandomString(4)
        console.log(password);
        var md5pass = md5(password)
        console.log(md5pass);
        // var cpassWord = req.body.cpassword
        // console.log(cpassWord);



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


        let inquery = `insert into registration1 (firstName, email, mobile, userName, pass, conPass) values('${req.body.fname}','${req.body.email}','${req.body.number}','${req.body.uname}','${md5pass}','${req.body.cpassword}')`;
        console.log(inquery);


        // s_id = result.insertId;
        // console.log(s_id);

        db.query(inquery, function (error, result) {

            // call(result.insertId)

            return res.end("Data generated whoo!!");
        });

        console.log("hey!!");

    }
    catch (error) {
        return res.write("Try again please")
    }
})

app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.ejs'));
});

app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.uname;
	let password = request.body.md5password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query(`SELECT * FROM registration1 WHERE userName =  AND pass = ?`, [userName, pass], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.listen(port, () => {
    console.log(`listening port ${port}`);
})