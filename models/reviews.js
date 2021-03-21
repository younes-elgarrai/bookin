// collection reviews - avis sur les livres - dans la base Bookin sur MongoDB

var mongoose = require('mongoose');

var reviewsSchema = mongoose.Schema({
    userLibraryName: String,
    avatar: String,
    rating: Number,
    comment: String,
    bookid: String
});
var ReviewsModel = mongoose.model('reviews', reviewsSchema);
module.exports = ReviewsModel;