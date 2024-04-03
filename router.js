const express = require("express")
const { home, register, login, registerData, keycompare, loginData} = require("./controllers/loginregister/homePage")
const { tic_tac_toe } = require("./controllers/tictactoe/tictactoe")
const { event } = require("./controllers/events/event")
const { appliform } = require("./controllers/jobapplication/form")
const { sorting } = require("./controllers/sorting/sort")
const { kuku } = require("./controllers/kukucube/game")
const { comment, number } = require("./controllers/comments/showcomment")
const { fetch} = require("./controllers/fetchapi/fetching")
const { sqlquery, sqldata } = require("./controllers/dynamicquery/sql")
const { validateform, validateformdata } = require("./controllers/validationform/validate")
const { timedata } = require("./controllers/timzone/time")
const { card } = require("./controllers/cards/card")
const { route } = require("./controllers/noroute/none")
const { exam, examdata, attendance } = require("./controllers/result/school")
const { dynamicsearch } = require("./controllers/dynamicsearch/searching")
const { paginate } = require("./controllers/pagination/page")
const router = express.Router()


router.route("/").get(route)

router.route("/home").get(home)
router.route("/register").get(register).post(registerData)
router.route("/login").get(login).post(loginData)
router.route("/keycompare").get(keycompare)

router.route("/tictactoe").get(tic_tac_toe)

router.route("/events").get(event)

router.route("/jobform").get(appliform)

router.route("/sort").get(sorting)

router.route("/cube").get(kuku)

router.route("/posts").get(comment)
router.route("/posts/:id").get(number)

router.route("/pagination").get(fetch)

router.route("/sqlinsert").get(sqlquery).post(sqldata)

router.route("/validation").get(validateform).post(validateformdata)

router.route("/time").get(timedata)

router.route("/cards").get(card)

router.route("/newhtml/:page").get(attendance)
router.route("/exam").get(exam)
router.route("/exam/:studentid").get(examdata)

router.route("/searchgrid").get(dynamicsearch)

router.route("/page").get(paginate)

module.exports = router;