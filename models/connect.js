// fichier de connexion à la base bookin sur MongoDB via Mongoose

var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true,
    useFindAndModify: false
   }
mongoose.connect('mongodb+srv://bookin:bookin@cluster0.jbm7k.mongodb.net/book_in?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );
module.exports = mongoose;  