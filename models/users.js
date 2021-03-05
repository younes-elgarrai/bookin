var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    favoriteBookStyles: new mongoose.Schema({ 'BD & Jeunesse': Array, 
                                              'Littérature & Fiction': Array,
                                              'Vie Pratique': Array, 
                                              'Art, Culture & Société': Array, 
                                              'Nature & Loisirs': Array, 
                                              'Savoirs': Array}),
    favoriteBookLength: Array,
    favoriteBookPeriod: Array,
    token: String,
    avatar: String,
    email: String,
    password: String,
    userLibraryName: String,
    library: [{type:mongoose.Schema.Types.ObjectId, ref:'books'}],
    wishlist: [{type:mongoose.Schema.Types.ObjectId, ref:'books'}],
    Following: Array
   });
   
var UsersModel = mongoose.model('users', userSchema);
module.exports = UsersModel;