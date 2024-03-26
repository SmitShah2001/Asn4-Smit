/******************************************************************************
***
* ITE5315 – Assignment 4
* I declare that this assignment is my own work in accordance with Humber Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Name: Smit Shah Student ID: N01580089 Date: 23-03-2024
*
*
******************************************************************************
**/

var express = require('express');
var mongoose = require('mongoose');
var app = express();
const path = require('path');
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)

const exphbs = require('express-handlebars');

var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(express.static(path.join(__dirname, "public"))); //default public path

app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    helpers: {
        displayAvgReviews: function (avgReviews) {
            return avgReviews !== '' ? avgReviews : 'N/A';
        }
    }
}));

app.set('view engine', 'hbs');


mongoose.connect(database.url);

// var Employee = require('./models/employees');
var Books = require('./models/books');

const { Result } = require('express-validator');
const { time } = require('console');



// Question 1 

//get all employee data from db --using promise
app.get("/api/employees", function (req, res) {
    // use mongoose to get all todos in the database
    Employee.find()
        .exec()
        .then((employees) => {
            // send data
            res.json(employees);
        })
        .catch((err) => {
            // send the error
            res.send(err);
        });
});

// get a employee with ID of 1 --using promise
app.get('/api/employees/:employee_id', function (req, res) {
    let id = req.params.employee_id;

    Employee.findById(id)
        .exec()
        .then((employee) => res.json(employee))
        .catch((err) => res.send(err));
});

// create employee and send back all employees after creation --using promise
app.post('/api/employees', function (req, res) {
    // create mongoose method to create a new record into collection
    console.log(req.body);

    Employee.create({
        name: req.body.name,
        salary: req.body.salary,
        age: req.body.age
    })
        .then((employee) => {
            // After successfully creating the employee, find and return all employees
            return Employee.find().exec();
        })
        .then((employees) => {
            // Send all employees as JSON response
            res.json(employees);
        })
        .catch((err) => {
            // Handle errors
            res.status(500).send(err);
        });
});

// create employee and send back all employees after creation -- using promise
app.put('/api/employees/:employee_id', function (req, res) {
    // create mongose method to update an existing record into collection
    console.log(req.body);

    let id = req.params.employee_id;
    var data = {
        name: req.body.name,
        salary: req.body.salary,
        age: req.body.age
    }

    // save the user
    Employee.findByIdAndUpdate(id, data)
        .exec()
        .then((employee) => {
            res.send("Successfully! Employee updated -" + employee.name);
        })
        .catch((err) => {
            res.send(err);
        });
});

// delete a employee by id -- using promise
app.delete('/api/employees/:employee_id', function (req, res) {
    console.log(req.params.employee_id);
    let id = req.params.employee_id;
    Employee.deleteOne({
        _id: id
    })
        .then((result) => res.send("'Successfully! Employee has been Deleted." + id))
        .catch((err) => res.send(err));
});

// Question 2 - Assignment 2 Books 

//get all books-info from db
app.get("/api/data", function (req, res) {
    Books.find()
        .exec()
        .then((books) => {
            res.json(books);
        })
        .catch((err) => {
            res.send(err);
        });
});

// get a books data with isbn
app.get("/api/data/isbn/:isbn", function (req, res) {
    let isbn = req.params.isbn;
    console.log(isbn);
    Books.findOne({ "ISBN_13": isbn })
        .exec()
        .then((books) => {
            if (!books) {
                return res.json({ error: "Book not found" });
            }
            res.json(books);
        })
        .catch((err) => {
            res.send(err);
        });
});

// insert a new book 
app.post("/api/books", function (req, res) {
    console.log(req.body);

    Books.create({
        "title": req.body["title"],
        "author": req.body["author"],
        "price": req.body["price"],
        "price (including used books)": req.body["price (including used books)"],
        "pages": req.body["pages"],
        "avg_reviews": req.body["avg_reviews"],
        "n_reviews": req.body["n_reviews"],
        "star": req.body["star"],
        "dimensions": req.body["dimensions"],
        "weight": req.body["weight"],
        "language": req.body["language"],
        "publisher": req.body["publisher"],
        "ISBN": req.body["ISBN"],
        "complete_link": req.body["complete_link"],
    })
        .then((books) => {
            console.log(books);
            return res.send("Successfully inserted Book!");
        })
        .catch((err) => {
            res.send(err);
        });
});

// delete a book by isbn
app.delete("/api/isbn/:isbn", function (req, res) {
    console.log(req.params.isbn);
    let isbn = req.params.isbn;
    console.log(isbn);
    Books.deleteOne({ "ISBN_13": isbn })
        .then((result) => res.send("Successfully Deleted Book!" + isbn))
        .catch((err) => res.send(err));
});

// update book info by isbn
app.put("/api/isbn/:isbn", function (req, res) {
    console.log(req.body);

    let isbn = req.params.isbn;
    var data = {
        "title": req.body["title"],
        "price": req.body["price"],
    };

    // save the data
    Books.findOneAndUpdate({ "ISBN_13": isbn }, data)
        .exec()
        .then((book) => {
            res.send("Successfully! Book Info Updated");
            console.log(book);
        })
        .catch((err) => {
            res.send(err);
        });
});

// show all book information
app.get("/api/allData", (req, res) => {
    Books
        .find()
        .lean()
        .exec()
        .then(books => {
            console.log(books);
            res.render("allData", { title: "All Books", books: books });
        })
        .catch((err) => {
            res.send(err);
        });
});

//insert a new book form
app.get("/api/insertNewBook", (req, res) => {
    res.render("insertBookForm", { title: "Insert Book Form" });
});

//insert a new book result success
app.post("/api/insertNewBook", (req, res) => {
    Books.create({
        "title": req.body.title,
        "author": req.body.author,
        "price": req.body.price,
        "pages": req.body.pages,
        "avg_reviews": req.body.avg_reviews,
        "n_reviews": req.body.n_reviews,
        "star": req.body.star,
        "dimensions": req.body.dimensions,
        "weight": req.body.weight,
        "language": req.body.language,
        "publisher": req.body.publisher,
        "ISBN": req.body.ISBN,
        "complete_link": req.body.complete_link,

    })
        .then((books) => {
            console.log(books);
            return res.render("insertBookSuccess", { title: "Success Book" });
        })
        .catch((err) => {
            res.send(err);
        });
});


// search a book 
app.get("/api/searchBook", (req, res) => {
    res.render("isbn-search-form", { title: "Search Book Form" });
});

//search a book result
app.post("/api/searchBook", (req, res) => {
    const isbn = req.body.ISBN;
    Books.findOne({ "ISBN_13": isbn })
        .lean()
        .exec()
        .then((book) => {
            console.log(book);
            if (!book) {
                return res.json({ error: "Book not found" });
            }

            const bookData = {
                ISBN: book["ISBN_13"],
                title: book["title"],
                author: book["author"],
                price: book["price"],
                publisher: book["publisher"]
            };

            res.render("isbn-search-result", {
                book: bookData,
                title: "Search Book Result"
            });
        })
        .catch((err) => {
            res.send(err);
        });
});



app.listen(port);
console.log("App listening on port : " + port);
