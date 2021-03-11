import React , {useState, useEffect}  from 'react';
import {Redirect} from 'react-router-dom';
import { Modal, Button, Row, Col} from 'antd';
import { StarFilled, CheckCircleFilled} from '@ant-design/icons';
import {  } from '@ant-design/icons';
import '../App.css'
import Background from '../assets/picto.png'
import Cover from '../assets/cover.jpg'
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import FittedImg from 'react-fitted-img';


function BookHeader(props) {


// Traduction catégorie
var translateCat = {
"Antiques & Collectibles":"Antiques et à Collectionner",
"Architecture":"Architecture",
"Art":"Art",
"Bibles":"Bibles",
"Biography & Autobiography":"Biographies et Autobiographies",
"Body, Mind & Spirit":"Corps et Esprit",
"Business & Economics":"Entreprises et Économie",
"Comics & Graphic Novels":"Bandes Dessinées et Romans Graphiques",
"Computers":"Informatique",
"Cooking":"Cuisine",
"Crafts & Hobbies":"Artisanat et Passe-Temps",
"Design":"Désign",
"Drama":"Art Dramatique",
"Education":"Éducation",
"Family & Relationships":"Famille et Relations Humaines",
"Fiction":"Fiction",
"Foreign Language Study":"Étude de langues étrangères",
"Games & Activities":"Jeux et activités",
"Gardening":"Jardinage",
"Health & Fitness":"Santé et Mise en Forme",
"History":"Histoire",
"House & Home":"Maison",
"Humor":"Humour",
"Juvenile Fiction":"Livre pour enfant",
"Juvenile Nonfiction":"Livre pour enfant",
"Language Arts & Disciplines":"Arts des langus et Disciplines",
"Law":"Loi",
"Literary Collections":"Collections Litéraires",
"Literary Criticism":"Critiques Litéraires",
"Mathematics":"Mathématiques",
"Medical":"Médecine",
"Music":"Musique",
"Nature":"Nature",
"Performing Arts":"Arts de la Scène",
"Pets":"Animaux de Compagnie",
"Philosophy":"Philosophie",
"Photography":"Photographie",
"Poetry":"Poésie",
"Political Science":"Science Politique",
"Psychology":"Psychologie",
"Reference":"Référence",
"Religion":"Religion",
"Science":"Science",
"Self-Help":"Développement Personnel",
"Social Science":"Sciences Sociales",
"Sports & Recreation":"Sports et Loisirs",
"Study Aids":"Aide à l’étude",
"Technology & Engineering":"Technologie et Ingénérie",
"Transportation":"Transport",
"Travel":"Voyages",
"True Crime":"Criminalité",
"Young Adult Fiction":"Adolescent-Fiction",
"Young Adult Nonfiction":"Adolescent-NonFiction",


}

  // Récupération du tableau d'auteurs et les séparer par une virgule
  var authors;
  if (props.bookAuthor){
    if (props.bookAuthor.length>1){
      authors=props.bookAuthor.join(', ');
    } else {
      authors=props.bookAuthor;
    }
  }

  // Récupération de la 1ère catégorie du livre
  var styleBook=null;
  if (props.bookCat) {
    if (props.bookCat.length!=0) {
      styleBook=props.bookCat[0].split('/')[0].trim();
      styleBook=translateCat[styleBook];
    } 
  }
 
  // Création de l'url pour l'achat vers Amazon
  var urlAmazon = `https://www.amazon.fr/gp/search?ie=UTF8&tag=bookin0c-21&linkCode=ur2&linkId=ed069e44484efe7e5139cd6a95321518&camp=1642&creative=6746&index=books&keywords=${props.bookIsbn}`

  // Const pour la modal du bouton ajout à ma wishlit
  const [isModalLB, setIsModalLB] = useState(false);
  const [isModalWL, setIsModalWL] = useState(false);
  const [boutonWLStyle, setBoutonWLStyle]= useState(false);
  const [boutonLBStyle, setBoutonLBStyle]= useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);


  // Interroger la route pour ajouter wishList
    // Bouton pour ajout à la WishList
    var boutonWishListSelected = (
      <Button onClick={() => handleClickWLDelete()}  style={{marginRight:'10px',  backgroundColor:'#445d96', fontWeight:'500', color:'white', borderColor:'#445d96', borderRadius:'5px'}}>❤ WISHLIST</Button>
    );
  
    var boutonWishListDefault = (
    <Button onClick={() => handleClickWLAdd()}  style={{marginRight:'10px',  backgroundColor:'#fca311', fontWeight:'500', color:'#23396c', borderColor:'#fca311', borderRadius:'5px'}}>JE VEUX LIRE</Button>
    );

      // Cancel WishLit
  const handleCancelWL = () => {
    setIsModalWL(false);
  };

  const handleClickWLAdd = async () => {
    if (props.user!==null) {
      var addWishList = async () => {
        const data = await fetch(`/wishlist/add/${props.user.token}/${props.bookId}`, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({"cover":props.bookCover, "title":props.bookTitle})
        });
        const body = await data.json();
  
        if (body.result===true) {
          setBoutonWLStyle(!boutonWLStyle);
          setIsModalWL(true);
          props.addToWishList(props.bookId);
        }
  
      };
      addWishList();
      
    } else {
      setIsLoggedIn(true);
          props.beforeLogin("/book/"+props.bookId+"AddLB");
    }
  };

  const handleClickWLDelete = async () => {
    if (props.user!==null) {
      const dataDelete = await fetch(`/wishlist/delete/${props.user.token}/${props.bookId}`, {
      method: 'DELETE'
      });
      const bodyDelete = await dataDelete.json();


      if (bodyDelete.result===true) {
        setBoutonWLStyle(false);
        var index;
        for (let i = 0; i < props.wishlist.length; i++) {
          if (props.wishlist[i].bookid === props.bookId) {
            index = i;
          }
        }
        props.DeleteToWishList(props.bookId, index);
      }
      
    }
  };

  // Interroger la route pour ajouter à la biblitohèque et à la wishlist en cas de retour depuis login
  useEffect(() => {
    if (props.user && props.previousLocation) {
        if (props.previousLocation.slice(props.previousLocation.length - 5) === "AddLB") {
            var addLibrary= async () => {
              const data = await fetch(`/library/add/${props.user.token}/${props.bookId}`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({"cover":props.bookCover, "title":props.bookTitle})
              });
              const body = await data.json();
              if (body.result===true) {        
                setIsModalLB(true);
                setBoutonLBStyle(!boutonLBStyle);
                props.addToLibrary(props.bookId);
              };
            };
          addLibrary();
            
        } else if (props.previousLocation.slice(props.previousLocation.length - 5) === "AddWL") {
          var addWishList = async () => {
            const data = await fetch(`/wishlist/add/${props.user.token}/${props.bookId}`, {
              method: 'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({"cover":props.bookCover, "title":props.bookTitle})
            });
            const body = await data.json();
            if (body.result===true) {
              setBoutonWLStyle(!boutonWLStyle);
              setIsModalWL(true);
              props.addToWishList(props.bookId);
            } else {
            }
          };
          addWishList();
      }; 
    } else {
    }
  }, [props.user, props.previousLocation, props.bookTitle])

  // Interroger la route pour ajouter à la biblitohèque
  const handleClicLBAdd = async () => {
    if (props.user!==null) {
      var addLibrary= async () => {
        const data = await fetch(`/library/add/${props.user.token}/${props.bookId}`, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({"cover":props.bookCover, "title":props.bookTitle})
        });
        const body = await data.json();
        if (body.result===true) {
          setIsModalLB(true);
          setBoutonLBStyle(!boutonLBStyle);
          props.addToLibrary(props.bookId);
        }
      };
      addLibrary();
    } else {
      setIsLoggedIn(true);
      props.beforeLogin("/book/"+props.bookId+"AddLB");
    }
  };

  // Interroger la route pour supprimer de la biblitohèque
  const handleClickLBDelete = async () => {
    if (props.user!==null) {
      const dataDelete = await fetch(`/library/delete/${props.user.token}/${props.bookId}`, {
      method: 'DELETE'
      });
      const bodyDelete = await dataDelete.json();

      if (bodyDelete.result===true) {
        var index;
        for (let i = 0; i < props.library.length; i++) {
          if (props.library[i].bookid === props.bookId) {
            index = i;
          }
        }
        props.DeleteToLibrary(props.bookId, index);
        setBoutonLBStyle(!boutonLBStyle);
      }
      
    }
  };

  // Cancel Library
  const handleCancelLB = () => {
    setIsModalLB(false);
  };


 // Bouton pour ajout à la Bibliothèque
 var boutonLibrarySelected = (
  <Button onClick={() => handleClickLBDelete()}  style={{marginRight:'10px',  backgroundColor:'#445d96', fontWeight:'500', color:'white', borderColor:'#445d96', borderRadius:'5px'}}>✔ DEJA LU</Button>
);

var boutonLibraryDefault = (
  <Button onClick={() => handleClicLBAdd()}  style={{marginRight:'10px',  backgroundColor:'#fca311', fontWeight:'500', color:'#23396c', borderColor:'#fca311', borderRadius:'5px'}}>J'AI LU</Button>
);


useEffect(() => {
  if (props.user!==null) {
    var CheckWishList = async () => {
      const data = await fetch(`/wishlist`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.user.token}`
      });
      const body = await data.json();

      if (body.result===true) {
        setBoutonWLStyle(false);
        props.setWishlist(body.wishlist);
        for (let i = 0; i < body.wishlist.length; i++) {
          if (body.wishlist[i].bookid===props.bookId) {
            setBoutonWLStyle(true);
          }; 
        };
      }
    };
    CheckWishList();

    var CheckLibrary = async () => {
      const data = await fetch(`/library`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.user.token}`
      });
      const body = await data.json();

      if (body.result===true) {
        props.setLibrary(body.library);
        setBoutonLBStyle(false);
        for (let i = 0; i < body.library.length; i++) {
          if (body.library[i].bookid===props.bookId) {
            setBoutonLBStyle(true);
          }
        }; 
      };
    };
    CheckLibrary();
  };

},[props.bookId])


if (isLoggedIn) {
  return(<Redirect to='/connection'/>);
} else {
return (
    <div style={styles.container} className='font'>
      <Row style={styles.bookBloc}  >
        <Col xs={24} md={8} xl={5} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <FittedImg fit="fill" style={styles.images} width={128} height={210} src={!props.bookCover ? `${Cover}`:props.bookCover} alt={props.bookTitle}/>  

            {props.bookPage === 'nc' ? null :
            <a href={props.bookPage} target="_blank">
            <p style={{marginBottom:'0', fontWeight:'100', color:'white', textDecoration:'underline'}}> Je feuillette</p>
            </a>}

        </Col>

        <Col xs={24} md={12} xl={12} >
          <h1 style={styles.h1}>{props.bookTitle}</h1>
          <h2 style={styles.h2}>{authors}</h2>
        
          <div>

          <StarFilled style={{fontSize: '20px', color:"#fca311", marginRight:'2px'}}/>
          <StarFilled style={{fontSize: '20px', color:"#fca311", marginRight:'2px'}}/>
          <StarFilled style={{fontSize: '20px', color:"#fca311", marginRight:'2px'}}/>
          <StarFilled style={{fontSize: '20px', color:"#fca311", marginRight:'2px'}}/>
          <StarFilled style={{fontSize: '20px', color:"#e1e1e1", marginRight:'2px'}}/>

          <p style={styles.note} >Note 3,5/5 | 12 avis</p>
          </div>
      
        <div>
          <Button style={{pointerEvents:'none', backgroundColor:'white', color:'#fca311',borderColor:'#fca311', borderRadius:'15px'}}>{styleBook}</Button>
        </div>

        </Col>
    </Row>

    <Row style={styles.buyBloc}>
      <div>
        <Col xs={24}>
        {boutonLBStyle ? boutonLibrarySelected : boutonLibraryDefault}
        <Modal centered title="Félicitations" visible={isModalLB} footer={null} onCancel={handleCancelLB} style={{textAlign: "center"}}>
          <img style={{margin:'10px'}} width={70} src={!props.bookCover ? `${Cover}`:props.bookCover} alt={props.bookTitle} /> 

          <div style={{textAlign: "center"}}>
            <CheckCircleFilled style={{ color:'#37a000', fontSize:'16px', textAlign:'right'}}/>
            <p style={{fontSize: '16px', fontWeight:'bold', color:"#23396c"}}>Le livre "{props.bookTitle}" <br />a bien été ajouté à votre bibliothèque<br /><br /></p>
            <Link to='/main'><Button onClick={()=>props.onTabClick(1)} style={{marginRight:'10px',  backgroundColor:'#fca311', fontWeight:'500', color:'#23396c', borderColor:'#fca311', borderRadius:'5px'}}>Voir ma bibliothèque</Button></Link>   
          </div>
        </Modal>
        
          {boutonWLStyle ? boutonWishListSelected : boutonWishListDefault}
          <Modal centered title="Félicitations" visible={isModalWL} footer={null} onCancel={handleCancelWL} style={{textAlign: "center"}}>
            <img style={{margin:'10px'}} width={70} src={!props.bookCover ? `${Cover}`:props.bookCover} alt={props.bookTitle} /> 

            <div style={{textAlign: "center"}}>
              <CheckCircleFilled style={{ color:'#37a000', fontSize:'16px', textAlign:'right'}}/>
              <p style={{fontSize: '16px', fontWeight:'bold', color:"#23396c"}}>Le livre "{props.bookTitle}" <br />a bien été ajouté à votre wishlist<br /><br /></p>
              <Link to='/main'><Button onClick={()=>props.onTabClick(2)} style={{marginRight:'10px',  backgroundColor:'#fca311', fontWeight:'500', color:'#23396c', borderColor:'#fca311', borderRadius:'5px'}}>Voir ma wishlist</Button></Link>   
            </div>
          </Modal>

        {props.bookIsbn === 'nc' ? null : 
        <a href={urlAmazon} target="_blank">
        <Button style={{marginRight:'10px',  backgroundColor:'#e5e5e5', fontWeight:'500', color:'#23396c', borderColor:'#23396c', borderRadius:'5px'}}>J'ACHETE</Button>
        </a>}

        </Col>
      </div>
    </Row>

</div>

    
);
}
}

let styles = {
    container: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100vw',
      },

    bookBloc: {
        width:'80%',
        display:'flex',
        alignItems:'start',
        justifyContent:'flex-start',
        backgroundColor: '#23396C',
        borderTopRightRadius:"10px",
        borderTopLeftRadius:"10px",
        padding:'30px',
        backgroundImage: `url(${Background})`,
        backgroundSize: '25%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom',
    },

    buyBloc: {
        width:"80%",
        display:"flex",
        justifyContent: "flex-start",
        background: "#e1e1e1",
        paddingLeft:"30px",
        paddingRight:"30px",
        paddingTop: "15px",
        paddingBottom: "15px",
    },

    h1: {
        color:'white',
        fontSize: '22px',
        fontWeight: '700',
        margin: '0px',
        paddingTop:'10px',
        paddingBottom:'10px',
    },

    h2: {
        color:'#ffffff',
        fontSize: '16px',
        fontWeight: '400',
        margin: '0px',
        paddingBottom:'10px',
    },

    note: {
        color:'#ffffff',
        fontSize: '12px',
        fontWeight: '200',
    },

    link: {
        textDecoration: 'none',
        color:'#ffffff',
      },

    images: {
      borderRadius:5,
      boxShadow: "1px 1px 1px #e1e1e1",
    },

    bouton: {
      marginRight:'10px',  
      backgroundColor:'#fca311', 
      fontWeight:'500', 
      color:'#23396c', 
      borderColor:'#fca311', 
      borderRadius:'5px'
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      beforeLogin: function(previousLocation) {
        dispatch( {type: 'beforeLogin', previousLocation:previousLocation} )
      }, 
      setWishlist: function(wishlist) {
        dispatch( {type: 'setWishlist', wishlist:wishlist} )
      }, 
      setLibrary: function(library) {
        dispatch( {type: 'setLibrary', library:library} )
      }, 
      addToWishList: function(bookId) {
          dispatch( {type: 'addToWishList', bookId:bookId} )
      }, 
      DeleteToWishList: function(bookId, index) {
        dispatch( {type: 'DeleteToWishList', bookId:bookId, index:index} )
      },
      addToLibrary: function(bookId) {
        dispatch( {type: 'addToLibrary', bookId:bookId} )
      }, 
      DeleteToLibrary: function(bookId, index) {
      dispatch( {type: 'DeleteToLibrary', bookId:bookId, index:index} )
      },
      onTabClick: function(value) {
        dispatch( {type:'setTab', value} )
    },
    }
  }

  function mapStateToProps(state) {
    console.log('state', state);
    return { user:state.user, wishlist: state.wishlist, library:state.library, previousLocation:state.previousLocation }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BookHeader);
