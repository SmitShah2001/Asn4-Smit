var mongoose = require('mongoose');
var Schema = mongoose.Schema;
BooksSchema = new Schema({
    "title": String,
    "author": String,
    "price": Number,
    "price (including used books)": Number,
    "pages": Number,
    "avg_reviews": Number,
    "n_reviews": Number,
    "star": Number,
    "dimensions": String,
    "weight": String,
    "language": String,
    "publisher": String,
    "ISBN": String,
    "complete_link": String,
});
module.exports = mongoose.model('Books', BooksSchema);


// {
//     "title": "Data Analysis Using R (Low Priced Edition): A Primer for Data Scientist",
//     "author": "[ Dr Dhaval Maheta]",
//     "price": 6.75,
//     "price (including used books)": 6.75,
//     "pages": 500,
//     "avg_reviews": 4.4,
//     "n_reviews": 23,
//     "star": "55%",
//     "dimensions": "8.5 x 1.01 x 11 inches",
//     "weight": "2.53 pounds",
//     "language": "English",
//     "publisher": "Notion Press Media Pvt Ltd (November 22, 2021)",
//     "ISBN_13": "978-1685549596",
//     "complete_link": "https://www.amazon.com/Data-Analysis-Using-Low-Priced/dp/1685549594/ref=sr_1_16?keywords=data+analysis&qid=1671164640&sr=8-16"
//   },