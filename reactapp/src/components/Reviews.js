import React, {useState, useEffect} from 'react';
import { Avatar, Row, Col} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../App.css';
import ReviewCard from './ReviewCard';


function Reviews(props) {
    console.log('reviews > props.list', props.list);

    const displayReviewsResult = (list) => {
        if (list === undefined || list.length == 0) {
            return(
                <Col xs={24}><p style={{fontSize:'14px', color:'#000000'}}>Pas encore d'avis sur ce livre. Soyez le premier en remplissant le formulaire !</p></Col>
            )
        } else {
            return(
                list.map(review => {
                    return(
                        <Col xs={24} >
                        <ReviewCard data={review} />
                        </Col>
                    )
                })  
            )
        }
    }

return (
    <div style={styles.reviewBloc}>
        <Row>
            <Col xs={24}>
                <h3 style={styles.h3}>Les derniers avis</h3>
            </Col>
        </Row>
        <Row >
        {displayReviewsResult(props.list)}
        </Row>
</div>
);
}

let styles = {
    container: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
      },

    reviewBloc: {
        width:"80%",
        backgroundColor: "#ffffff",
        paddingLeft:"30px",
        paddingRight:"30px",
        paddingTop: "30px",
    },

    h3: {
        color:"#23396C",
        fontSize: "16px",
        fontWeight: "500",
        margin: "0px",
        paddingBottom:"10px"
      }
  }
export default Reviews;