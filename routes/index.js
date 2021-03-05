const express = require('express');
const router = express.Router();
const UsersModel = require('../models/users');
const ReviewsModel = require('../models/reviews');
const BooksModel = require('../models/books');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
  Add a book in my library
  Body : token et isbn13
  Response : result
*/
router.post('/library/add/:token/:isbn13/', (req, res) => {
  let isbn13 = req.params.isbn13;
  let token = req.params.token;

  res.json({result})
});


/*
  Delete a book from library
  Body : token et isbn13
  Response : result (true),
*/
router.delete('/library/delete/:token/:isbn13/', async (req, res) => {
  let isbn13 = req.params.isbn13;
  let token = req.params.token;

  var result = await bookModel.deleteOne({ idBook : req.params.idBook})

  res.json({result})
});


router.post('/recos', async (req,res)=>{
  //Recupérer les résultats du questionnaire stockés dans un cookie, et renvoyer des suggestions.
  //Entrées : cookie questionnaire ou token
  //recherche par category (subjects) puis tri sur longueur et sur nouveautés
  //Sorties : objet suggestions , erreur ==> refaites le questionnarire
  var catQueryMaker = (cat, styles)=>{
  
    var r = {};
    styles[cat].forEach( (subcat)=>{
        r[subcat] = subjects[cat][subcat];
         });
    return r;

};

  var queryMaker = (styles) => {

    var cats = Object.keys(styles).filter(e=>e!=='void');

    var queries = cats.map( cat => {
        return catQueryMaker(cat, styles);
    })

    var r = {}
    for (var i = 0; i < cats.length; i++) {
        r[cats[i]] = queries[i];}
    
    return r; };

    var handleSearch = async (q) => {

      try {
            const response = await axios.get(`https://books.googleapis.com/books/v1/volumes?q=${q}&maxResults=6&langRestrict=en&orderBy=relevance&fields=items,totalItems&apiKey=AIzaSyCf_Mpql10SDNH98u0oNNYZuS7RzPqJ62k`);
            const body = await response.data;
            const books = await body.items.map((elem, index)=>{return elem});               
            return books ;
          }catch(error) {
              console.log(error)
        }};


    var handleSubcatQueriesSearch = async (queries) => {

        const pArray = queries.map(async (query)=>{
            const response = handleSearch(query);
            return response;
        })

        const items = await Promise.all(pArray);

        var merged = [].concat.apply([], items);

        return merged;

    }


    var handleSubCatSearchv2 = async (q) => {

      var qArray = Object.values(q);

      var subcats = Object.keys(q);

      const pArray = qArray.map(async (queries) =>{
        return handleSubcatQueriesSearch(queries);
      });

      const resultArray = await Promise.all(pArray);

      var result = {};

      subcats.forEach((key, i) => result[key] = resultArray[i]);


      return result;


    }
  
      var handleSurveySearch = async (q) => {
  
  
          var results = {};
  
          var cats = Object.keys(q);
  
          for (var i = 0; i < cats.length; i++) {
  
              const cat = cats[i];
  
              results[cat] = [];
  
              var catItems = await handleSubCatSearchv2(q[cat]);
  
              results[cat] = catItems
              
              };
  
          return results;
  
      }


      try {

        const response = await handleSurveySearch(req.body)

        res.json({result:response});
        
      } catch (error) {

        res.json({result:error})
        
      }
      
  

})
 

router.get('/library/:token', function (req, res) {
  //Accéder à une bibliothèque à partir de l'id du User (paramètre associé au composant livre)
  //Entrées : userId
  //mécanique de récupération d'une bibliothèque
  //Sorties : success, failure, [ISBN13]
 })


// POST : Login/Signup step 0 : check email from user ("continuer")
router.post('/check-email', async function (req, res, next) {
  const checkExistingUserFromEmail = await UsersModel.findOne({email: req.body.email});
  console.log('check', checkExistingUserFromEmail); // null 
  if (checkExistingUserFromEmail) {
    res.json({result:true});
  } else {
    res.json({result:false})
  }
});

// POST : Login
router.post('/log-in', async function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.json({ login: false, message: "Veuillez remplir tous les champs pour accéder à votre compte."})
  } else {
  const user = await UsersModel.findOne({email: req.body.email});
  const password = req.body.password;
  const userToken = user.token;
  if (bcrypt.compareSync(password, user.password)) {
    res.json({ login: true, userToken });
  } else { 
    res.json({login: false, message: "Ce compte n'existe pas, veuillez réessayer ou créer un compte." }); }
}});

// POST : Signup
router.post('/sign-up', async function(req, res, next) {
  const checkExistingUserFromEmail = await UsersModel.findOne({email: req.body.email});
  if (checkExistingUserFromEmail) {
    res.json({result: false, message: "Il existe déjà un compte associé à cet email."})
  }
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.json({result: false, message: "Veuillez remplir tous les champs pour créer un compte."})
  } else {
    const userSave = await saveNewUser(req);
    console.log('usersave', userSave);
    const userToken = userSave.token;
    res.json({result:true, userToken});
  }
});
async function saveNewUser(req) {
  const cost = 10;
  const hash = bcrypt.hashSync(req.body.password, cost);
  const user = new UsersModel({
    favoriteBookStyles: JSON.parse(req.body.styles), 
    favoriteBookLength: [req.body.length], 
    favoriteBookPeriod: [req.body.period], 
    userLibraryName: req.body.name,
    avatar: 'req.body.avatar' ,
    email: req.body.email,
    password: hash,
    token: uid2(32), 
  });
  const userSave = await user.save();
  return userSave;
}

// Update profile
router.post('/update', async (req, res) => {
  const user = await UsersModel.find({token: req.body.token});
  // mettre à jour les champs souhaités : tout sauf l'email, le token, library, wishlist. 
  // par ex : 
  if (req.body.userLibraryName) {
    user.userLibraryName = req.body.userLibraryName;
  }
  const userSave = await user.save();
  res.json({ result: true, userSave });
});

// Post review
router.post('/new-review', (req, res) => {
  const review = new ReviewsModel({ // voir sur le cours
    isbn13: req.body.isbn13,
    userLibraryName: req.body.userLibraryName,
    avatar: req.body.avatar,
    rating: req.body.rating,
    comment: req.body.comment,
  })
  // save.
  res.json({ result: true, review });
});

// Get reviews
router.get('/reviews', async (req, res) => {
  const reviews = await ReviewsModel.find(); // par book ISBN
  res.json({ result: true, reviews });
});

/*
  Recherche sur Google Books API de livres
  Query : q ("tintin" || "saint-exupery" || "des fleurs pour algernon" || "978-2-7654-0912-0")
  Response : result (true), books [{title ("Tintin au Congo"), cover ("http://books.google.com/books/content?id=eFxNDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"), resultCount(56), publishedDate(1970), ISBN13(9782203192157)}, ...]
API_key: "AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE"
  */

 router.get('/search', (req, res) => {
  let q = req.query.q;

  if (!q) {
    res.json({ result: false });
  } else {
    // Appel à la google books API
    // limiter le nb de résultats
    res.json({ result: true, books: [{
      title: 'Tintin au Congo',
      cover: 'http://books.google.com/books/content?id=eFxNDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      publishedDate: "1970",
      ISBN13: "9782203192157",
    },] });
  }
});

/* Recherche de wishlist à la BDD  */

router.post('/wishlist', async (req, res) => {
  let token = req.body.token;
  if (!token) {
    res.json({ result: false });
  } else {
  const user = await UsersModel.findOne({token: req.body.token}).populate('wishlist').exec()
  var userWishlist = user.wishlist
  res.json({result: true, wishlist: userWishlist})
}
});


/* Suppression d'un livre dans la wishlist d'un user dans la BDD */

router.delete('/wishlist/delete/:token/:bookid', async (req, res) => {
  let token = req.params.token;
  let bookid = req.params.bookid;
  const regex = new RegExp("[0-9A-Za-z_\-]{12}")

  if (!token || !regex.test(bookid) ) {
    res.json({ result: false });
  } else {
    var bookToDelete = await BooksModel.findOne({bookid: bookid});
    var user = await UsersModel.findOneAndUpdate({token: token},{ $pull: {wishlist: bookToDelete._id}});
    res.json({ result: true});
  }
});

/* Ajout d'un livre dans la wishlist d'un user dans la BDD  */
 router.post('/wishlist/add/:token/:bookid', async (req, res) => {
  let token = req.params.token;
  let bookid = req.params.bookid;
  const regex = new RegExp("[0-9A-Za-z_\-]{12}")

  if (!token || !regex.test(bookid) ) {
    res.json({ result: false });
  
  } else {

  try {

    var bookToCheck = await BooksModel.findOne({bookid: bookid});
    console.log("bookToCheck",bookToCheck);

    if (bookToCheck === null) { 
      const newBookInWishlist =  new BooksModel({
        title: req.body.title, 
        cover: req.body.cover, 
        bookid: bookid, 
      });
      savedBookInWishlist = await newBookInWishlist.save();
      console.log("newBookInWishlist",newBookInWishlist);
      
      var userCheck = await UsersModel.findOne({token: token});
      var userCheckTab = [];
      for (let i = 0; i < userCheck.wishlist.length; i++) {
        console.log("userCheck.wishlist[i]",userCheck.wishlist[i])
        if (JSON.stringify(userCheck.wishlist[i]) === JSON.stringify(savedBookInWishlist._id)) {
          userCheckTab.push(userCheck)
        }
      }
      console.log("userCheck",userCheck);
      console.log("userCheckTab",userCheckTab);

      if (userCheckTab.length === 0) { 
        var user = await UsersModel.findOneAndUpdate({token: token},{ $push: {wishlist: savedBookInWishlist._id}});
        console.log("user",user);
      };

    } else {
      var userCheck2 = await UsersModel.findOne({token: token});
      console.log("userCheck2",userCheck2);
      var userCheckTab2 = [];
      for (let i = 0; i < userCheck2.wishlist.length; i++) {
        if (JSON.stringify(userCheck2.wishlist[i]) === JSON.stringify(bookToCheck._id)) {
          userCheckTab2.push(userCheck2)
        }
      }
      console.log("userCheckTab2",userCheckTab2);

      if (userCheckTab2.length === 0) {
        var user2 = await UsersModel.findOneAndUpdate({token: token},{ $push: {wishlist: bookToCheck._id}});
        console.log("user2",user2)
      };

    }

    var result = true;
  }
  catch (error) {
    var result = false
  }

  res.json({result})
 }})

module.exports = router;