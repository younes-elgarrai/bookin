import React , {useState, useEffect}  from 'react';
import { Modal, Button, Row, Col} from 'antd';
import { StarFilled, CheckCircleFilled} from '@ant-design/icons';
import {  } from '@ant-design/icons';
import '../App.css'
import Background from '../assets/picto.png'
import Cover from '../assets/cover.jpg'
import {Link} from "react-router-dom";


function BookHeader(props) {

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
  console.log(urlAmazon);

  // Const pour la modal du bouton ajout à ma wishlit
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={styles.container} className='font'>
      <Row style={styles.bookBloc}  >
        <Col xs={24} md={8} xl={5} >
          <img width={150} src={!props.bookCover ? `${Cover}`:props.bookCover} alt={props.bookTitle}/>  
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
        
        
        {/* <div>
        <Button style={{marginRight:'10px',  backgroundColor:'white', color:'#fca311',borderColor:'#fca311', borderRadius:'15px'}}>{props.bookCat}</Button>
      </div> */}
        </Col>
    </Row>

    <Row style={styles.buyBloc}>
      <div>
        <Col xs={24}>
        <Button onClick={showModal} style={{margin:'10px',  backgroundColor:'#fca311', fontWeight:'500', color:'#23396c', borderColor:'#fca311', borderRadius:'5px'}}>J'AI LU</Button>

        <Modal centered title="Félicitations" visible={isModalVisible} footer={null} onCancel={handleCancel} >
          <img style={{float:'left'}} width={100} src={!props.bookCover ? `${Cover}`:props.bookCover} alt={props.bookTitle} /> 

          <div style={{textAlign: "center"}}>
            <CheckCircleFilled style={{ color:'#37a000', fontSize:'16px', textAlign:'right'}}/>
            <p style={{fontSize: '16px', fontWeight:'bold', color:"#23396c"}}>Le livre "{props.bookTitle}" <br />a bien été ajouté à votre bibliothèque<br /><br /></p>
            <Link to='/library'><Button style={{marginRight:'10px',  backgroundColor:'#fca311', fontWeight:'500', color:'#23396c', borderColor:'#fca311', borderRadius:'5px'}}>Voir ma bibliothèque</Button></Link>   
          </div>
        </Modal>

        <Button style={{marginRight:'10px',  backgroundColor:'#fca311', fontWeight:'500', color:'#23396c', borderColor:'#fca311', borderRadius:'5px'}}>JE VEUX LIRE</Button>
        
        <a href={urlAmazon} target="_blank">
        <Button style={{marginRight:'10px',  backgroundColor:'#e5e5e5', fontWeight:'500', color:'#23396c', borderColor:'#23396c', borderRadius:'5px'}}>J'ACHETE</Button>
        </a>
        </Col>
      </div>
    </Row>

</div>

    
);
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
      }
  }

export default BookHeader;


