import React, {useState, useEffect} from 'react';
import { Avatar, Row, Col} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../App.css';
import ReviewCard from './ReviewCard';


function Reviews() {
    const [ reviewsList, setReviewsList ] = useState([]);
    console.log('reviewslist', reviewsList);

    useEffect(() => {
        async function loadData() {
            var rawResponse = await fetch('/reviews');
            var response = await rawResponse.json();
            console.log('response load reviews', response.reviews);
            setReviewsList(response.reviews);
        } 
        loadData();
        }, []); 


return (
    <div style={styles.reviewBloc}>
        <Row>
            <Col xs={24}>
                <h3 style={styles.h3}>Les derniers avis</h3>
            </Col>
        </Row>

        <Row style={{marginBottom:'10px'}}>
            <Col xs={24} md={2} xl={2}>
                <Avatar size={64} icon={<UserOutlined />} />
            </Col>

            <Col xs={24} md={22} xl={22}>
                <p style={{fontWeight:"500", marginBottom:"0px", color:"#23396C"}}>Nom de l'utilisateur</p>
                <p style={{color:"#333", fontSize:"14px", fontWeight:"300"}}>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
            </Col>
        </Row>

        <Row style={{marginBottom:'10px'}}>
            <Col xs={24} md={2} xl={2}>
                <Avatar size={64} icon={<UserOutlined />} />
            </Col>

            <Col xs={24} md={22} xl={22}>
                <p style={{fontWeight:"500", marginBottom:"0px", color:"#23396C"}}>Nom de l'utilisateur</p>
                <p style={{color:"#333", fontSize:"14px", fontWeight:"300"}}>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
            </Col>
        </Row>
        <Row style={{marginBottom:'10px'}}>

        {reviewsList && reviewsList.map(review => {
            return(
                <Col xs={24}>
                <ReviewCard data={review} />
                </Col>
            )
        })}
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