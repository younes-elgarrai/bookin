var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
        useUnifiedTopology : true
   }
mongoose.connect('mongodb+srv://bookin:bookin@cluster0.jbm7k.mongodb.net/book_in?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );
module.exports = mongoose;  