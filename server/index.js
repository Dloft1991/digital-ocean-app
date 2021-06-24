const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "new_password",
  database: "deployApp",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert = "INSERT INTO reviews (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.delete("/api/delete/:movieName", (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = "DELETE FROM reviews WHERE movieName = ?";

  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  const sqlUpdate = "UPDATE reviews SET movieReview = ? WHERE movieName = ?";

  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

// app.get('/', (req, res) => {
//     // **** test mysql connection ****
//     const sqlInsert =
//     "INSERT INTO reviews (movieName, movieReview) VALUES ('inception', 'great movie')";
//     db.query(sqlInsert, (err, result) => {
//         console.log(err);
//         res.send("hello you");
//     })

//     })
