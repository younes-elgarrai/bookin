var mongoose = require('mongoose');

var reviewsSchema = mongoose.Schema({
    userLibraryName: String,
    avatar: String,
    rating: Number,
    comment: String,
    isbn13: String
});
var ReviewsModel = mongoose.Model('reviews', reviewsSchema);
module.exports = ReviewsModel;