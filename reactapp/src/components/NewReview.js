import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import { Input, Button, Form , Modal} from 'antd';
import {connect} from 'react-redux';
import { StarFilled } from '@ant-design/icons';

const { TextArea } = Input;

function NewReview(props) {
  
  const [ rating, setRating ] = useState(0);
  const [ review, setReview ] = useState('');
  const [ userMessage , setUserMessage ] = useState('');
  // modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => { setIsModalVisible(true);};
  const handleCancel = () => { 
    setIsModalVisible(false);
    setReview('');
    setRating(0);
  };

const displayStars = (nb) => {
    let stars = [];
    for (let i = 0 ; i < 5 ; i++) {
      let starStyle = { fontSize: '20px', color: "#e1e1e1", marginRight:'2px'};
      if (i < nb) { 
        starStyle = { fontSize: '20px', color: "#fca311", marginRight:'2px' }
        } 
      stars.push(<StarFilled style={starStyle} onClick={()=> setRating(i+1)}/>);     
    }
    return stars;
  }

const loadData = () => { props.loadReviewsData() }  
const saveNewReview = async () => {
    if (rating === 0) {
      setUserMessage('Veuillez noter ce livre pour valider votre avis !')
    } else if (review === '') {
      setUserMessage('Veuillez saisir au moins 5 caractères pour valider votre avis.')
    } else {
      const response = await fetch('/new-review', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `book=${props.book}&token=${props.user.token}&rating=${rating}&comment=${review}`
      });
      const dataResponse = await response.json();
      if (dataResponse.result) {
        showModal();
        loadData();
      } else {
        setUserMessage(dataResponse.message);
      }
    }
}

return(
    <div style={styles.reviewBloc}>
    <h3 style={styles.title}>Donnez votre avis</h3>
    {props.user ? 
     <Form layout="vertical" style={{width:'80%', paddingLeft:'20px'}}>
     <Form.Item required tooltip="Ce champ est obligatoire" label="Note sur 5">
     <div style={{display:'flex'}}>{displayStars(rating)}</div>
     </Form.Item>
     <Form.Item required tooltip="Ce champ est obligatoire (au moins 5 caractères)" label="Qu'avez-vous pensé de ce livre ?">
         <TextArea rows={6} placeholder="Quel suspens ! je l'ai lu en une soirée." allowClear={true}  onChange={(e)=> setReview(e.target.value)} value={review}/>
     </Form.Item>
     <Form.Item>
         <Button style={styles.btn} onClick={()=> saveNewReview()} >Valider</Button>
         <Modal centered title="Félicitations !" visible={isModalVisible} footer={null} onCancel={handleCancel} style={{textAlign: "center"}}>
         <p style={styles.userMsg}>Votre avis a bien été ajouté.</p>
       </Modal>
         <p style={styles.userMsg}>{userMessage}</p>
     </Form.Item>
     </Form>
    :
    <div>
      <p style={styles.labelInline}><Button type='link' style={styles.smallBtn}><Link to='/connection'>Connectez-vous</Link></Button> pour écrire un avis !</p> 
    </div>
    }
    </div>
)
}

const styles = {
  reviewBloc: {
    width:"80%",
    backgroundColor: "#ffffff",
    paddingLeft:"30px",
    paddingRight:"30px",
    paddingTop: "30px",
},
    title: {
        color:"#23396C",
        fontSize: "16px",
        fontWeight: "500",
        marginTop: "20px",
        paddingBottom:"10px"
    },
    userMsg: {
      color:"#fca311",
        fontSize:'14px',
        fontWeight:'bold',
      },
      btn: {
          marginRight:'10px',
          backgroundColor:'#fca311', 
          fontWeight:'500', 
          color:'#23396c', 
          borderColor:'#fca311', 
          borderRadius:'5px',
      },
      smallBtn:{
        color:'#23396c',
        fontSize:'14px',
        padding:0,
        fontWeight:'bold',
        marginTop:'5px',
        marginBottom:'10px',
    },
    labelInline: {
        display:'inline',
        color:'#000000',
        fontSize:'14px',
        marginTop:'20px',
        marginBottom:'10px'
      }, 
}
function mapStateToProps(state) {
    return { user: state.user}
  }
export default connect(mapStateToProps, null)(NewReview);