import React, { useState } from 'react';
import '../App.css';
import { Input, Button, Form , Avatar} from 'antd';
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';
import { BookOutlined, StarFilled } from '@ant-design/icons';

const { TextArea } = Input;

function NewReview(props) {

const [ rating, setRating ] = useState(0);
console.log('new review > rating', rating);
const [ review, setReview ] = useState('');
const [ userMessage , setUserMessage ] = useState('');

let displayStars = (nb) => {
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

  const tempBookId = "Récupérer l'ID google du livre dont on est sur la page";

const saveNewReview = async () => {
    const response = await fetch('/new-review', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `book=${tempBookId}&token=${props.user.token}&rating=${rating}&comment=${review}`
      });
      const dataResponse = await response.json();
      console.log('dataResponse',dataResponse); 
}

return(
    <div style={{width:'60%'}}>
    <h3 style={styles.title}>Donnez votre avis</h3>
 <Form layout="vertical">
    <Form.Item required tooltip="Ce champ est obligatoire" label="Note sur 5">
    <div style={{display:'flex'}}>{displayStars(rating)}</div>
    </Form.Item>
    <Form.Item label="Qu'avez-vous pensé de ce livre ?">
        <TextArea rows={6} placeholder="Quel suspens ! je l'ai lu en une soirée." prefix={<BookOutlined className="site-form-item-icon" />}  onChange={(e)=> setReview(e.target.value)} value={review}/>
    </Form.Item>
    <Form.Item>
        <Button style={styles.btn} onClick={()=> saveNewReview()} >Valider</Button>
        <p style={styles.userMsg}>{userMessage}</p>
    </Form.Item>
    </Form>
    </div>
)
}
const styles = {
    title: {
        color:"#23396C",
        fontSize: "24px",
        fontWeight: "500",
        marginTop: "20px",
        paddingBottom:"10px"
    },
    userMsg: {
        color:"#23396C",
        fontSize:'12px',
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
}
function mapStateToProps(state) {
    return { user: state.user}
  }
export default connect(mapStateToProps, null)(NewReview);