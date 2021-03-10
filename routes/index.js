const express = require('express');
const router = express.Router();
const UsersModel = require('../models/users');
const ReviewsModel = require('../models/reviews');
const BooksModel = require('../models/books');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const axios = require('axios');
const uniqid = require('uniqid');
var fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
 cloud_name: 'deyw4czpf',
 api_key: '652491259593498',
 api_secret: 'tz5mXMcSbUPLjiBo4oikcnuXnzw' });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

/* Ajout d'un livre dans la bibliothèque d'un user dans la BDD  */
router.post('/library/add/:token/:bookid', async (req, res) => {
  let token = req.params.token;
  let bookid = req.params.bookid;
  const regex = new RegExp("[0-9A-Za-z_\-]{12}")

  if (!token || !regex.test(bookid) ) {
    res.json({ result: false, message: "Aie, nous n'avons pas pu ajouter le livre à votre bibliothèque" });
  
  } else {

  try {

    var bookToCheck = await BooksModel.findOne({bookid: bookid});
    console.log("bookToCheck",bookToCheck);

    if (bookToCheck === null) { 
      const newBookInLibrary =  new BooksModel({
        title: req.body.title, 
        cover: req.body.cover, 
        bookid: bookid, 
      });
      savedBookInLibrary = await newBookInLibrary.save();
      console.log("newBookInLibrary",newBookInLibrary);
      
      var userCheck = await UsersModel.findOne({token: token});
      var userCheckTab = [];
      for (let i = 0; i < userCheck.library.length; i++) {
        console.log("userCheck.library[i]",userCheck.library[i])
        if (JSON.stringify(userCheck.library[i]) === JSON.stringify(savedBookInLibrary._id)) {
          userCheckTab.push(userCheck)
        }
      }
      console.log("userCheck",userCheck);
      console.log("userCheckTab",userCheckTab);

      if (userCheckTab.length === 0) { 
        var user = await UsersModel.findOneAndUpdate({token: token},{ $push: {library: savedBookInLibrary._id}});
        console.log("user",user);
        res.json({ result: true, message: "Livre n'est pas dans la bibliothèque" });
      } else {res.json({ result: false, message: "Livre déjà dans votre bibliothèque" });}

    } else {
      var userCheck2 = await UsersModel.findOne({token: token});
      console.log("userCheck2",userCheck2);
      var userCheckTab2 = [];
      for (let i = 0; i < userCheck2.library.length; i++) {
        if (JSON.stringify(userCheck2.library[i]) === JSON.stringify(bookToCheck._id)) {
          userCheckTab2.push(userCheck2)
        }
      }
      console.log("userCheckTab2",userCheckTab2);

      if (userCheckTab2.length === 0) {
        var user2 = await UsersModel.findOneAndUpdate({token: token},{ $push: {library: bookToCheck._id}});
        console.log("user2",user2)
      } else {res.json({ result: false, message: "Livre déjà dans votre bibliothèque" });}

    }
    var result = true;
  }
  catch (error) {
    var result = false
  }
  res.json({result})
 }});


/* Recherche de library à la BDD  */
router.post('/library', async (req, res) => {
  let token = req.body.token;
  if (!token) {
    res.json({ result: false, message: "Nous n'avons pas vu vous identifier" });
  } else {
  const user = await UsersModel.findOne({token: req.body.token}).populate('library').exec()
  var userLibrary = user.library
  res.json({result: true, library: userLibrary})
}
});

/* Delete a book from library */
router.delete('/library/delete/:token/:bookid', async (req, res) => {
  let token = req.params.token;
  let bookid = req.params.bookid;
  const regex = new RegExp("[0-9A-Za-z_\-]{12}");

  if (!token || !regex.test(bookid) ) {
    res.json({ result: false, message: "Aie, nous n'avons pas pu supprimer le livre de votre bibliothèque" });
  } else {
            var bookToDelete = await BooksModel.findOne({bookid: bookid});
            var userCheck = await UsersModel.findOne({token: token, library: bookToDelete._id})
            if (userCheck !== null) {
              var user = await UsersModel.findOneAndUpdate({token: token},{ $pull: {library: bookToDelete._id}});
              res.json({ result: true});
            } else {
                res.json({ result: false, message: "livre déjà supprimé de votre bibliothèque" });
              }
          }
});



router.post('/recos', async (req,res)=>{
  //Recupérer les résultats du questionnaire stockés dans un cookie, et renvoyer des suggestions.
  //Entrées : cookie questionnaire ou token
  //recherche par category (subjects) puis tri sur longueur et sur nouveautés
  //Sorties : objet suggestions , erreur ==> refaites le questionnarire

  // AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE

  // AIzaSyCf_Mpql10SDNH98u0oNNYZuS7RzPqJ62k

  var handleSearch = async (q) => {
      try {
            const response = await axios.get(`https://books.googleapis.com/books/v1/volumes?q=${q}&maxResults=20&langRestrict=fr&orderBy=newest&fields=items,totalItems&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`);
            const body = await response.data;
            const books = await body.items.map((elem, index)=>{return elem});               
            return books ;
          }catch(error) {
              console.log(error)
        }};


  var handleSubcatQueriesSearch = async (queries) => {
    const pArray = queries.map(async (query) => {
      const response = handleSearch(query);
      return response;
    })
    const items = await Promise.all(pArray);
    var merged = [].concat.apply([], items);

    // return merged;

    return items;

  }


  var handleSubCatSearchv2 = async (q) => {
    var qArray = Object.values(q);
    var subcats = Object.keys(q);
    const pArray = qArray.map(async (queries) => {
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
    res.json({
      result: response
    });
  } catch (error) {
    res.json({
      result: error
    })
  }
})


router.get('/library/:token', function (req, res) {
  //Accéder à une bibliothèque à partir de l'id du User (paramètre associé au composant livre)
  //Entrées : userId
  //mécanique de récupération d'une bibliothèque
  //Sorties : success, failure, [ISBN13]
})

// POST : Login
router.post('/log-in', async function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.json({
      login: false,
      message: "Veuillez remplir tous les champs pour accéder à votre compte."
    })
  } else {
  const user = await UsersModel.findOne({email: req.body.email});
  const password = req.body.password;
  if (user) {
    const userToken = user.token;
    const userAvatar = user.avatar;
    const userLength = user.favoriteBookLength;
    const userPeriod = user.favoriteBookPeriod;
    const userStyles = user.favoriteBookStyles;
    if (bcrypt.compareSync(password, user.password)) {
      res.json({ login: true, userToken, userAvatar , userLength, userPeriod, userStyles});
  }
  } else { 
    res.json({login: false, message: "Nous ne trouvons pas de compte associé à cet email et ce mot de passe, veuillez réessayer ou créer un compte." }); }
}});


// POST : upload user avatar
router.post('/upload', async function (req, res, next) {
  console.log("req.files", req.files);
  const imagePath = './temp/'+uniqid()+'.jpg';
  const resultCopy = await req.files.avatar.mv(imagePath);
  console.log('result copy', resultCopy);
  if(!resultCopy) {
    const resultCloudinary = await cloudinary.uploader.upload(imagePath);
    console.log('result cloudinary', resultCloudinary);
    fs.unlinkSync(imagePath);
    res.json({result: true, message: 'File uploaded!', url: resultCloudinary.url } );      
  } else {
    res.json({result: false, message: resultCopy} ); } 
});

// POST : Signup
router.post('/sign-up', async function (req, res, next) {
  const checkExistingUserFromEmail = await UsersModel.findOne({
    email: req.body.email
  });
  if (checkExistingUserFromEmail) {
    res.json({result: false, message: "Il existe déjà un compte associé à cet email. Vous pouvez y accéder en vous connectant."})
  }
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.json({
      result: false,
      message: "Veuillez remplir tous les champs pour créer un compte."
    })
  } else {
    const userSave = await saveNewUser(req);
    console.log('usersave', userSave);
    const userToken = userSave.token;
    const userAvatar = userSave.avatar;
    const userLength = user.favoriteBookLength;
    const userPeriod = user.favoriteBookPeriod;
    const userStyles = user.favoriteBookStyles;
    res.json({result:true, userToken, userAvatar, userLength, userPeriod, userStyles});
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
    avatar: req.body.avatar,
    email: req.body.email,
    password: hash,
    token: uid2(32),
  });
  const userSave = await user.save();
  return userSave;
}

// GET & POST : Update profile
// Step 1 : GET to find user email
router.get('/users/:token', async (req, res) => {
  const user = await UsersModel.findOne({token: req.params.token});
  const userEmail = user.email;
  const userLibraryName = user.userLibraryName;
  res.json({result:true, userEmail, userLibraryName })
 })
// Step 2 : POST to update profile // In progress....
router.post('/update', async (req, res) => {
  console.log('update req',req);
  const user = await UsersModel.find({token: req.body.token});
  // mettre à jour les champs souhaités : tout sauf l'email, le token, library, wishlist. 
  // par ex : 
  if (req.body.name) {
    user.userLibraryName = req.body.name;
  }
 
  const userSave = await user.save();
  res.json({
    result: true,
    userSave
  });
});

router.post('/update-survey', async (req, res) => {
  let token = req.body.token;
  if (!token) {
    res.json({ result: false, message: "Nous n'avons pas vu vous identifier" });
  } else {
  const userCheck = await UsersModel.findOne({token: req.body.token});
  if (userCheck !== null) {
    var user = await UsersModel.findOneAndUpdate({token: token},{ favoriteBookPeriod : [req.body.period],
                                                                  favoriteBookLength : [req.body.length],
                                                                  favoriteBookStyles : JSON.parse(req.body.styles)},{new:true});
    res.json({ result: true, newuser: user});
  } else {
      res.json({ result: false, message: "la mise à jour a échoué" });
    }
}
});


// POST : write a new book review
router.post('/new-review', async (req, res) => {
  const user = await UsersModel.findOne({token: req.body.token});
  if (!user) {
    res.json({result: false, message: "Veuillez vous identifier pour écrire un avis."})
  } else {
    const reviews = await ReviewsModel.findOne({bookid: req.body.book, userLibraryName: user.userLibraryName});
    if (!reviews) {
      const review = new ReviewsModel({ 
        bookid: req.body.book,
        userLibraryName: user.userLibraryName,
        avatar: user.avatar,
        rating: req.body.rating,
        comment: req.body.comment,
      })
      const reviewSave = await review.save();
      res.json({result: true, reviewSave});
    } else {
      res.json({result: false, message: "Vous avez déjà écrit un avis sur ce livre."})
    }
    }


});

// GET : get all reviews for a book
router.get('/reviews/:bookid', async (req, res) => {
  const reviews = await ReviewsModel.find({bookid: req.params.bookid}); 
    res.json({ result: true, reviews});
});

/* Recherche sur Google Books API de livres
API_key: "AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE"
*/

//  router.get('/search', (req, res) => {
//   let q = req.query.q;

//   if (!q) {
//     res.json({ result: false });
//   } else {
//     // Appel à la google books API
//     // limiter le nb de résultats
//     res.json({ result: true, books: [{
//       title: 'Tintin au Congo',
//       cover: 'http://books.google.com/books/content?id=eFxNDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
//       publishedDate: "1970",
//       ISBN13: "9782203192157",
//     },] });
//   }
// });

/* Recherche de wishlist à la BDD  */

router.post('/wishlist', async (req, res) => {
  let token = req.body.token;
  if (!token) {
    res.json({ result: false, message: "Nous n'avons pas vu vous identifier" });
  } else {
    const user = await UsersModel.findOne({
      token: req.body.token
    }).populate('wishlist').exec()
    var userWishlist = user.wishlist
    res.json({
      result: true,
      wishlist: userWishlist
    })
  }
});


/* Suppression d'un livre dans la wishlist d'un user dans la BDD */

router.delete('/wishlist/delete/:token/:bookid', async (req, res) => {
  let token = req.params.token;
  let bookid = req.params.bookid;
  const regex = new RegExp("[0-9A-Za-z_\-]{12}")

  if (!token || !regex.test(bookid) ) {
    res.json({ result: false, message: "Aie, nous n'avons pas pu supprimer le livre de votre wishlist" });
  } else {
    var bookToDelete = await BooksModel.findOne({
      bookid: bookid
    });

    var userCheck = await UsersModel.findOne({token: token, wishlist: bookToDelete._id})
    if (userCheck !== null)
    {
    var user = await UsersModel.findOneAndUpdate({
      token: token
    }, {
      $pull: {
        wishlist: bookToDelete._id
      }
    });
    res.json({
      result: true
    });
  } else {
    res.json({ result: false, message: "livre déjà supprimé de votre wishlist" });
  }
  }
});

/* Ajout d'un livre dans la wishlist d'un user dans la BDD  */
router.post('/wishlist/add/:token/:bookid', async (req, res) => {
  let token = req.params.token;
  let bookid = req.params.bookid;
  const regex = new RegExp("[0-9A-Za-z_\-]{12}")

  if (!token || !regex.test(bookid) ) {
    res.json({ result: false, message: "Aie, nous n'avons pas pu ajouter le livre à votre wishlist" });
  
  } else {

    try {

      var bookToCheck = await BooksModel.findOne({
        bookid: bookid
      });
      console.log("bookToCheck", bookToCheck);

      if (bookToCheck === null) {
        const newBookInWishlist = new BooksModel({
          title: req.body.title,
          cover: req.body.cover,
          bookid: bookid,
        });
        savedBookInWishlist = await newBookInWishlist.save();
        console.log("newBookInWishlist", newBookInWishlist);

        var userCheck = await UsersModel.findOne({
          token: token
        });
        var userCheckTab = [];
        for (let i = 0; i < userCheck.wishlist.length; i++) {
          console.log("userCheck.wishlist[i]", userCheck.wishlist[i])
          if (JSON.stringify(userCheck.wishlist[i]) === JSON.stringify(savedBookInWishlist._id)) {
            userCheckTab.push(userCheck)
          }
        
      }
      console.log("userCheck",userCheck);
      console.log("userCheckTab",userCheckTab);

      if (userCheckTab.length === 0) { 
        var user = await UsersModel.findOneAndUpdate({token: token},{ $push: {wishlist: savedBookInWishlist._id}});
        console.log("user",user);
        res.json({ result: true, message: "Livre n'est pas dans la wishlist" });
      } else {res.json({ result: false, message: "Livre déjà dans votre wishlist" });}

    } else {
      var userCheck2 = await UsersModel.findOne({token: token});
      console.log("userCheck2",userCheck2);
      var userCheckTab2 = [];
      for (let i = 0; i < userCheck2.wishlist.length; i++) {
        if (JSON.stringify(userCheck2.wishlist[i]) === JSON.stringify(bookToCheck._id)) {
          userCheckTab2.push(userCheck2)
        }
        console.log("userCheckTab2", userCheckTab2);
      }

      if (userCheckTab2.length === 0) {
        var user2 = await UsersModel.findOneAndUpdate({token: token},{ $push: {wishlist: bookToCheck._id}});
        console.log("user2",user2)
      } else {res.json({ result: false, message: "Livre déjà dans votre wishlist" });}

      var result = true;
    }
    } catch (error) {
      var result = false
    }

    res.json({
      result
    })
  }
})

module.exports = router;