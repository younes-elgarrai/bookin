var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    favoriteBookStyles: Array,
    favoriteBookLength: Array,
    favoriteBookPeriod: Array,
    token: String,
    avatar: String,
    email: String,
    password: String,
    userLibraryName: String,
    library: Array,
    wishlist: Array,
    Following: Array
   });
var UsersModel = mongoose.model('users', userSchema);
module.exports = UsersModel;