const express = require("express");
const db = require("./db/db");
const schedule = require("./db/schedule");
const bodyParser = require("body-parser");
const students = require("./db/students");
const auth = require("./db/auth");
const cors = require("cors");

// Set up the express app

var corsOptions = {
  origin: "*"
};


const app = express();
app.use(cors(corsOptions));

// get all schedule
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.post('/api/v1/courses', (req, res) => {
  if (req.body.courses == undefined || req.body.courses.length == 0) {
    return res.status(400).send({
      success: 'false',
      message: 'courses are required'
    });
  } else if (!req.body.studentID) {
    return res.status(400).send({
      success: 'false',
      message: 'student ID is required'
    });
  }
  const student = {
    _id: students.length + 1,
    id: req.body.studentID,
    courses: req.body.courses
  }
  students.push(student);
  return res.status(201).send({
    success: 'true',
    message: 'courses added successfully',
    student
  })
});
// app.post('/api/v1/todos', (req, res) => {
//   if (!req.body.title) {
//     return res.status(400).send({
//       success: 'false',
//       message: 'title is required'
//     });
//   } else if (!req.body.description) {
//     return res.status(400).send({
//       success: 'false',
//       message: 'description is required'
//     });
//   }
//   const todo = {
//     id: db.length + 1,
//     title: req.body.title,
//     description: req.body.description
//   }
//   courses.push(todo);
//   return res.status(201).send({
//     success: 'true',
//     message: 'todo added successfully',
//     todo
//   })
// });
app.get('/api/v1/schedule', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    data: schedule
  })
});
app.get('/api/v1/courses', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    data: students
  })
});
app.get('/api/v1/auth/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (auth[id] == true) {
    res.status(200).send({
      success: 'true',
      message: 'Valid'
    })
  }
  else{
    res.status(400).send({
      success: 'false',
      message: 'Not now'
    })
  }
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});