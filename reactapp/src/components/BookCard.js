import React from 'react';
import { Col} from 'antd';
import '../App.css'

function BookCard() {

return (
        <Col xs={12} md={6} xl={4} >
            <img style={{textAlign:'center'}} width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
            <p style={{color:"#333", fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {"Le parfum des fleurs la nuit dedezded dezdze dzaedzaed".substr(0,25)+"..."} </p> 
        </Col>


);
}

export default BookCard;
