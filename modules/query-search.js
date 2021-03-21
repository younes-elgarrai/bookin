
const axios = require('axios');

var subjects = {'BD & Jeunesse': {
  'BD, Comics' : ['subject:"Comics+%26+Graphic+Novels+/+General"', 
                          'subject:"Comics+%26+Graphic+Novels+/+Literary"',
                          'subject:"Comics+%26+Graphic+Novels+/+Superheroes"',
                          'subject:"Comics+%26+Graphic+Novels+/+Nonfiction+/+General"',
                          'subject:"Humor+/+Form+/+Comic+Strips+%26+Cartoons"'],
  'Manga':['subject:"Comics+%26+Graphic+Novels+/+Manga+/+General"',
           'subject:"Comics & Graphic Novels Manga Action & Adventure"',
           'subject:"Comics+%26+Graphic+Novels+Manga+Sports"',
           'subject:"Comics+%26+Graphic+Novels+/+Manga+/+For+boys"',
           'subject:"Comics+%26+Graphic+Novels+/+Manga+/+For+women"',
           'subject:"Comics+%26+Graphic+Novels+/+Manga+/+Science+Fiction"'],
  'Humour' : ['subject:"Humor+/+Topic+/+Men,+Women+%26+Relationships"',
              'subject:"Humor+/+Topic+/+Politics"',
              'subject:"Humor+/+Topic+/+Religion"',
              'subject:"Humor+/+Topic+/+History"',
              'subject:"Humor+/+General"'],
  'Livre jeunesse' : ['subject:"Juvenile+Fiction+/+General"',
                      'subject:"Juvenile+Fiction+/+Readers+/+Beginner"',
                      'subject:"Juvenile+Fiction+Action+%26+Adventure+General"',
                      'subject:"Juvenile+Fiction+/+Social+Themes+/+Friendship"',
                      'subject:"Juvenile+Fiction+/+Fantasy+%26+Magic"',
                      'subject:"Juvenile+Fiction+/+School+%26+Education"',
                      'subject:"Young+Adult+Fiction+/+Action+%26+Adventure+/+General"']
  }, 
'Littérature & Fiction': { 
  'Roman' : ['subject:"Fiction+/+General"',
             'subject%3A"FICTION+%2F+Romance+%2F+General"',
             'subject:"Fiction+/+Classics"',
             'subject:"Fiction+/+Literary"',
             'subject:"Fiction+/+Action+%26+Adventure"',
             'subject:"Fiction+/+African+American+/+General"',
             'subject:"Fiction+/+Romance+/+Contemporary"',
             'subject:"Fiction+/+Media+Tie-In"',
             'subject:"Fiction+/+Historical+/+General"',
             'subject%3A"Fiction%20%2F%20Political"',
             'subject:"FICTION / Sagas"',],
  'Poésie & théatre' : ['subject:"Poetry+/+General"',
                        'subject:"Poetry+/+European+/+General"',
                        'subject:"Poetry+/+Ancient+%26+Classical"',
                        'subject:"Poetry+/+European+/+French"',
                        'subject:"Poetry+/+Middle+Eastern"'],
  'Thriller, Roman Policier' : ['subject:"Fiction+/+Thrillers+/+Suspense"',
                                'subject:"Fiction+/+Mystery+%26+Detective+/+General"',
                                'subject:"Fiction+/+Mystery+%26+Detective+/+International+Mystery+%26+Crime"',
                                'subject:"Fiction+/+Psychological"',
                                'subject%3A"FICTION+%2F+Thrillers+%2F+Crime"',
                                'subject%3A"FICTION+%2F+Thrillers+%2F+Political"'],
  'Fantasy, Science Fiction' : ['subject%3A"FICTION+%2F+Science+Fiction+%2F+General"',
                                'subject%3A"FICTION+%2F+Science+Fiction+%2F+Action+%26+Adventure"',
                                'subject%3A"FICTION+%2F+Science+Fiction+%2F+Cyberpunk"',
                                'subject%3A"FICTION+%2F+Science+Fiction+%2F+Space+Opera"']
  },
'Vie Pratique':{
  'Cuisine': ['subject%3A"COOKING+%2F+General"',
              'subject%3A"COOKING+%2F+Baby+Food"',
              'subject%3A"COOKING+%2F+Health+%26+Healing+%2F+General"',
              'subject%3A"COOKING+%2F+Regional+%26+Ethnic+%2F+General"',
              'subject%3A"COOKING+%2F+Vegetarian"',
              'subject%3A"COOKING+%2F+Vegan"'],
  'Self Help' : ['subject%3A"SELF-HELP+%2F+General"',
                 'subject%3A"+SELF-HELP+%2F+Abuse"',
                 'subject%3A"SELF-HELP+%2F+Communication+%26+Social+Skills"',
                 'subject%3A"SELF-HELP+%2F+Creativity"',
                 'subject%3A"SELF-HELP+%2F+Spiritual"',
                 'subject%3A"SELF-HELP+%2F+Dreams"',
                 'subject%3A"SELF-HELP+%2F+Fashion+%26+Style"',
                 'subject%3A"SELF-HELP+%2F+Meditations"',
                 'subject%3A"SELF-HELP+%2F+Personal+Growth+%2F+General"',
                 'subject%3A"SELF-HELP+%2F+Self-Management+%2F+General"',
                 'subject%3A"SELF-HELP+%2F+Sexual+Instruction"'], 
  'Santé, Bien être' : ['subject:"Health+%26+Fitness+/+General"',
                        'subject:"Health+%26+Fitness+/+Diet+%26+Nutrition+/+General"',
                        'subject:"Health+%26+Fitness+/+Exercise"',
                        'subject:"Health+%26+Fitness+/+Yoga"',
                        'subject:"Body,+Mind+%26+Spirit+/+General"',
                        'subject:"Family+%26+Relationships+/+General"'], 
  'Loisirs Créatifs': ['subject%3A"CRAFTS+%26+HOBBIES"']
  }, 
'Art, Culture & Société':{
  'Actualités Politique, Economie, Société' : ['subject%3A"BUSINESS+%26+ECONOMICS"','subject%3A"POLITICAL+SCIENCE"','subject;"SOCIAL+SCIENCE"'], 
  'Art, Cinema, Musique': ['subject%3A"ART"','subject%3A"PERFORMING+ARTS"','subject%3A"PHOTOGRAPHY"','subject%3A"MUSIC"'],
  'Biographie, Autobiographie' : ['subject%3A"BIOGRAPHY+%26+AUTOBIOGRAPHY"'],
  'Histoire' : ['subject%3A"HISTORY"'],
  'Religion & Spiritualité' : ['subject%3A"RELIGION"'],
  'Sciences Humaines' : ['subject%3A"SOCIAL SCIENCE"','subject%3A"PSYCHOLOGY"','subject%3A"PHILOSOPHY"']
  }, 
'Nature & Loisirs':{
  'Nature, Animaux, Jardin' : ['subject%3A"NATURE"','subject%3A"PETS"','subject%3A"GARDENING"'],
  'Sport, Loisirs, Transport': ['subject%3A"SPORTS+%26+RECREATION"','subject%3A"TRANSPORTATION"'],
  'Tourisme & Voyage' : ['subject%3A"TRAVEL"'],
  }, 
'Savoirs':{
  'Droit' : ['subject%3A"Law"'], 
  'Entreprise, Management' : ['subject%3A"BUSINESS+%26+ECONOMICS+%2F+General"',
                              'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Accounting+%2F+Managerial"',
                              'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Business+Ethics"',
                              'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Business+Communication+%2F+General"',
                              'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Careers+%2F+General"',
                              'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Consulting"',
                              'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Decision-Making+%26+Problem+Solving"',
                              'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Development+%2F+General"',
                              'subject%3A"BUSINESS+%26+ECONOMICS+%2F+E-Commerce"',
                              'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Economics+%2F+General"',
                              'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Industrial+Management"',
                              'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Management"',
                              'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Strategic+Planning"'],
  'Livres informatique' : ['subject:"Computers+/+General"',
                           'subject:"Computers+/+Programming+Languages+/+JavaScript"',
                           'subject:"Computers+/+Electronic+Commerce"',
                           'subject:"Computers+/+Buyer%27s+Guides"',
                           'subject:"Computers+/+Computer+Engineering"',
                           'subject:"Computers+/+Computer+Science"',
                           'subject:"Computers+/+Hardware+/+General"',
                           'subject:"Computers+/+Programming+/+Algorithms"',
                           'subject:"Computers+/+Computer+Literacy"',
                           'subject:"Computers+/+Information+Technology"',
                           'subject:"Computers+/+Databases+/+General"',
                           'subject:"Computers+/+Data+Processing"',
                           'subject:"Computers+/+Internet+/+General"',
                           'subject:"Computers+/+Programming+Languages+/+Python"'],
  'Science & Médecine' : ['subject%3A"Science"','subject%3A"Medical"']
}};
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
var catQueryMaker = (cat, styles)=>{
            var r = {};
            styles[cat].forEach( (subcat)=>{
                r[subcat] = subjects[cat][subcat];
                 });
            return r;
};

// Si survey.Styles = {"BD & Jeunesse": ["BD, Comics","Manga","Livre jeunesse"],"Littérature & Fiction": ["Fantasy, Science Fiction"]}
//
// ("BD & Jeunesse", survey.Styles) ---> [catQueryMaker] ---> {"BD, Comics": ['subject:"Comics+%26+Graphic+Novels+/+General"...],
//                                                                  "Manga": ['subject:"Comics+%26+Graphic+Novels+/+Manga+/+General"'...],
//                                                         "Livre jeunesse": ['subject:"Juvenile+Fiction+/+General"'...] }
//
//
// La fonction récupère l'ensemble des queries stockées dans l'objet subjects qui correspondent aux sous catégories de styles, de la catégorie, sélectionnées lors de la réponse au survey.
//-------------------------------------------------------------------------------------------------------------------------------
var queryMaker = (styles) => {

// La fonction liste l'ensemble des catégories présentes dans la réponse au survey.
// compte tenu du modèle pour le stockage en base de données des infos utilisateurs (cf /models/users.js), l'ensemble des catégories possibles existent dans l'objet favoriteBookStyles
// Les catégories qui n'ont pas été selectionnées présentent un Array vide.
// Pour que les requêtes ne concernent que les catégories choisies, il faut filter les catégories, pour ne garder que celles qui stockent de l'information, 
// donc telles que categorie[sousCatégorie][0] existe.
// Il faut également éventuellement supprimer la céatégorie void, ainsi que l'id mongoDB
// ----->
            var cats = Object.keys(styles).filter(e=>e!=='void').filter(e=>e!=='_id').filter(e=>styles[e][0]);

// On construit ensuite un array à partir de ces catégories qui prépare l'ensemble des queries à réaliser à partir de la fonction catQueryMaker, et de la réponse au survey     
// -----> 
            var queries = cats.map( cat => {
                return catQueryMaker(cat, styles);
            })

// A partir de cet array, on construit un objet, avec les clés non vides du survey, et comme valeurs un sous objet de requetes avec un array de requetes pour chaque sous catégorie
            var r = {}
            for (var i = 0; i < cats.length; i++) {
                r[cats[i]] = queries[i];
            }
            return r; 

// Ainsi si survey.Styles = { 'BD & Jeunesse': ["BD, Comics","Manga","Livre jeunesse"], 
//                            'Littérature & Fiction': ["Fantasy, Science Fiction"],
//                            'Vie Pratique': [], 
//                            'Art, Culture & Société': [], 
//                            'Nature & Loisirs': [], 
//                            'Savoirs': []
//                            })
//
// (survey.Styles) ---> [queryMaker] ---> {"BD & Jeunesse" :  {"BD, Comics": ['subject:"Comics+%26+Graphic+Novels+/+General"...],
//                                                             "Manga": ['subject:"Comics+%26+Graphic+Novels+/+Manga+/+General"'...],
//                                                             "Livre jeunesse": ['subject:"Juvenile+Fiction+/+General"'...] },
//                                 "Littérature & Fiction" :  {"Fantasy, Science Fiction": ['subject%3A"FICTION+%2F+Science+Fiction+%2F+General"'...]}}   
};
//-------------------------------------------------------------------------------------------------------------------------------
// Toujours dans l'objectif de récupérer les résultats des queries à partir du survey, la fonction si dessous est une fonction asynchrone,
// qui retourne une promesse de résultat, à partir d'un String q, et qui réalise simplement la requête demandée auprès de l'API Google books. 

var handleSearch = async (q) => {
    try {
            const response = await axios.get(`https://books.googleapis.com/books/v1/volumes?q=${q}&maxResults=20&langRestrict=fr&orderBy=newest&fields=items,totalItems&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`);
            const body = await response.data;
            const books = await body.items;               
            return books ;
        }catch(error) {
            console.log(error)
      }};

//-------------------------------------------------------------------------------------------------------------------------------
// A ce stade, on sait transformer notre survey en un objet special, qui stocke les arrays des requêtes à réaliser, par catégorie et sous catégorie.
// Pour réaliser simultanément l'ensemble des requêtes associées, on prépare un tableau de Promesses pArray, qui stocke la promesse de réponse
// de chacune des requête d'un tableau donné.
//On créé ensuite une nouvelle promesse en utilisant Promise.all qui pour se réaliser, attend la réalisation de l'ensemble des promesses du tableau associé.

var handleSubcatQueriesSearch = async (queries) => {
            const pArray = queries.map(async (query) => {
                const response = handleSearch(query);
                return response;
            })
            const items = await Promise.all(pArray);
            return items;
}
// ---> Notre fonction, nous retourne alors le résultat sous la forme d'un tableau qui réussie qu'une fois l'ensemble de résultats récupérés.
//-------------------------------------------------------------------------------------------------------------------------------
var handleSubCatSearchv2 = async (q) => {
// on travaille cette fois avec un objet sous catégories q de la forme : {"BD, Comics": ['subject:"Comics+%26+Graphic+Novels+/+General"...],
//                                                             "Manga": ['subject:"Comics+%26+Graphic+Novels+/+Manga+/+General"'...],
//                                                             "Livre jeunesse": ['subject:"Juvenile+Fiction+/+General"'...] }
//
//
  var qArray = Object.values(q); // --> tableau d'arrays, représentant l'ensemble des queries à réaliser === [['subject:"Comics+%26+Graphic+Novels+/+General"...],['subject:"Comics+%26+Graphic+Novels+/+Manga+/+General"'...],['subject:"Juvenile+Fiction+/+General"'...]]
  var subcats = Object.keys(q); // --> tableau des sous catégories === ["BD, Comics", "Manga", "Livre jeunesse"]
  const pArray = qArray.map(async (queries) => {
    return handleSubcatQueriesSearch(queries);
  });
  const resultArray = await Promise.all(pArray);
  var result = {};

  subcats.forEach((key, i) => result[key] = resultArray[i]);

  return result; // =====result = {"BD, Comics": resultArray[0],
  //                                    "Manga": resultArray[1],
  //                           "Livre jeunesse": resultArray[2] }
  //
  // resultArray[i] étant un tableau de livres au format de l'API Google Books
}
// On obtient les résultats de recherche Google Books pour les sous-catégories d'un objet catégorie.
//-------------------------------------------------------------------------------------------------------------------------------
// A ce stade, on sait :
//  + transformer notre survey en un objet special, qui stocke les arrays des requêtes à réaliser, par catégorie et sous catégorie.
//  + récupérer les résultats d'une recherche pour les sous-catégories d'un objet catégorie.
// Il nous reste donc à parcourir chacune des catégories du survey pour reconstituer l'objet résultat.

// On transforme donc notre  objet 'query': {"BD & Jeunesse" :  {"BD, Comics": ['subject:"Comics+%26+Graphic+Novels+/+General"...],
//                                                               "Manga": ['subject:"Comics+%26+Graphic+Novels+/+Manga+/+General"'...],
//                                                               "Livre jeunesse": ['subject:"Juvenile+Fiction+/+General"'...] },
//                                   "Littérature & Fiction" :  {"Fantasy, Science Fiction": ['subject%3A"FICTION+%2F+Science+Fiction+%2F+General"'...]}}
// en objet 'results' qu'on alimente itérativement à l'aide des résultats de requêtes : 
var handleSurveySearch = async (q) => {
  var results = {};
  var cats = Object.keys(q);

  for (var i = 0; i < cats.length; i++) {
    const cat = cats[i];
    results[cat] = [];
    var catItems = await handleSubCatSearchv2(q[cat]);
    results[cat] = catItems;
  };

  return results;
}
//-------------------------------------------------------------------------------------------------------------------------------
// Enfin, on réalise toute la mécanique décrite précédemment directement sur l'objet 'survey' qui ressemble à :
//  survey.Styles = { 'BD & Jeunesse': ["BD, Comics","Manga","Livre jeunesse"], 
//                            'Littérature & Fiction': ["Fantasy, Science Fiction"],
//                            'Vie Pratique': [], 
//                            'Art, Culture & Société': [], 
//                            'Nature & Loisirs': [], 
//                            'Savoirs': []
//                            })

// pour obtenir l'objet 'response':
//                {"BD & Jeunesse" :  {"BD, Comics": resultArray[0],
//                                          "Manga": resultArray[1],
//                                 "Livre jeunesse": resultArray[2] },
//         "Littérature & Fiction" :  {"Fantasy, Science Fiction": resultArray[0]}}
//
// avec des tableaux de livres que l'on peut maintenant manipuler en front.

var surveySearch = async (survey) => {

    var query = queryMaker(survey);

    try {
        const response = await handleSurveySearch(query)
        return response;
      } catch (error) {
        return {
          result: error
        }
      }
}

exports.surveySearch = surveySearch;




