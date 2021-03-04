var mongoose = require('mongoose');


var booksSchema = mongoose.Schema({
    title: String,
    cover: String,
    bookid: String,
   });
   
var BooksModel = mongoose.model('books', booksSchema);
module.exports = BooksModel;