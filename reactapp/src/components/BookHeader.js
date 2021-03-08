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


function BookHeader(props) {
  console.log('BookScreenHeader > props.user.token', props.user);

  // Récupération du tableau d'auteurs et les séparer par une virgule
  var authors;
  if (props.bookAuthor){
    if (props.bookAuthor.length>1){
      authors=props.bookAuthor.join(', ');
    } else {
      authors=props.bookAuthor;
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

        console.log('body', body);
  
        if (body.result===true) {
          setBoutonWLStyle(!boutonWLStyle);
          setIsModalWL(true);
          props.addToWishList(props.bookId);
        }
  
      };
      addWishList();
      
    } else {
      setIsLoggedIn(true);
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
        props.DeleteToWishList(props.bookId);
      }
      
    }
  };

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
          // props.addToWishList(props.bookId);
        }
  
      };
      addLibrary();
      
    } else {
      setIsLoggedIn(true);
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
        setBoutonLBStyle(!boutonLBStyle);
        // props.DeleteToWishList(props.bookId);
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
        for (let i = 0; i < body.wishlist.length; i++) {
          if (body.wishlist[i].bookid===props.bookId) {
            setBoutonWLStyle(true);
          } else {
            setBoutonWLStyle(false);
          }
        } 
      }
    };
    CheckWishList();

    var CheckWishList = async () => {
      const data = await fetch(`/library`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.user.token}`
      });
      const body = await data.json();

      if (body.result===true) {
        for (let i = 0; i < body.library.length; i++) {
          if (body.library[i].bookid===props.bookId) {
            setBoutonLBStyle(true);
          } else {
            setBoutonLBStyle(false);
          }
        } 
      }
    };
    CheckWishList();
    
  };

},[])


if (isLoggedIn) {
  return(<Redirect to='/connection'/>);
} else {
return (
    <div style={styles.container} className='font'>
      <Row style={styles.bookBloc}  >
        <Col xs={24} md={8} xl={5} >
          <img style={styles.images} width={150} src={!props.bookCover ? `${Cover}`:props.bookCover} alt={props.bookTitle}/>  
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
      {/* 
        <div>
          <Button style={{marginRight:'10px',  backgroundColor:'white', color:'#fca311',borderColor:'#fca311', borderRadius:'15px'}}>{props.bookCat[0]}</Button>
        </div> */}

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
            <Link to='/library'><Button style={{marginRight:'10px',  backgroundColor:'#fca311', fontWeight:'500', color:'#23396c', borderColor:'#fca311', borderRadius:'5px'}}>Voir ma bibliothèque</Button></Link>   
          </div>
        </Modal>
        
          {boutonWLStyle ? boutonWishListSelected : boutonWishListDefault}
          <Modal centered title="Félicitations" visible={isModalWL} footer={null} onCancel={handleCancelWL} style={{textAlign: "center"}}>
            <img style={{margin:'10px'}} width={70} src={!props.bookCover ? `${Cover}`:props.bookCover} alt={props.bookTitle} /> 

            <div style={{textAlign: "center"}}>
              <CheckCircleFilled style={{ color:'#37a000', fontSize:'16px', textAlign:'right'}}/>
              <p style={{fontSize: '16px', fontWeight:'bold', color:"#23396c"}}>Le livre "{props.bookTitle}" <br />a bien été ajouté à votre wishlist<br /><br /></p>
              <Link to='/library'><Button style={{marginRight:'10px',  backgroundColor:'#fca311', fontWeight:'500', color:'#23396c', borderColor:'#fca311', borderRadius:'5px'}}>Voir ma wishlist</Button></Link>   
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
      boxShadow: "1px 1px 1px #e1e1e1"
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      addToWishList: function(bookId) {
          dispatch( {type: 'addToWishList', bookId:bookId} )
      }, 
      DeleteToWishList: function(bookId) {
        dispatch( {type: 'DeleteToWishList', bookId:bookId} )
      }
    }
  }

  function mapStateToProps(state) {
    console.log('state', state);
    return { user:state.user, wishlist: state.wishlist }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BookHeader);
