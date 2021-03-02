import React from 'react';
import { Row, Col, Image} from 'antd';
import '../App.css'

function BookCard() {

return (
    <div style={styles.libraryBloc}  className='font'>
        <Row>
            <Col xs={24}>
                <h3 style={styles.h3}>Nos recommandations</h3>
            </Col>
        </Row>
        <Row >
            <Col xs={12} md={6} xl={4} >
                <img style={{textAlign:'center'}} width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
                <div style={{color:"#333", fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {"Le parfum des fleurs la nuit dedezded dezdze dzaedzaed".substr(0,25)+"..."} </div> 
            </Col>

            <Col xs={12} md={6} xl={4} >
                <img style={{textAlign:'center'}} width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
                <div style={{color:"#333", fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {"Le parfum des fleurs la nuit dedezded dezdze dzaedzaed".substr(0,25)+"..."} </div> 
            </Col>

            <Col xs={12} md={6} xl={4} >
                <img style={{textAlign:'center'}} width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
                <div style={{color:"#333", fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {"Le parfum des fleurs la nuit dedezded dezdze dzaedzaed".substr(0,25)+"..."} </div> 
            </Col>

            <Col xs={12} md={6} xl={4} >
                <img style={{textAlign:'center'}} width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
                <div style={{color:"#333", fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {"Le parfum des fleurs la nuit dedezded dezdze dzaedzaed".substr(0,25)+"..."} </div> 
            </Col>

            <Col xs={12} md={6} xl={4} >
                <img style={{textAlign:'center'}} width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
                <div style={{color:"#333", fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {"Le parfum des fleurs la nuit dedezded dezdze dzaedzaed".substr(0,25)+"..."} </div> 
            </Col>

            <Col xs={12} md={6} xl={4} >
                <img style={{textAlign:'center'}} width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
                <div style={{color:"#333", fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {"Le parfum des fleurs la nuit dedezded dezdze dzaedzaed".substr(0,25)+"..."} </div> 
            </Col>

            <Col xs={12} md={6} xl={4} >
                <img style={{textAlign:'center'}} width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
                <div style={{color:"#333", fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {"Le parfum des fleurs la nuit dedezded dezdze dzaedzaed".substr(0,25)+"..."} </div> 
            </Col>
            
            <Col xs={12} md={6} xl={4} >
                <img style={{textAlign:'center'}} width={150} src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'alt='Le parfum des fleurs la nuit'/>
                <div style={{color:"#333", fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {"Le parfum des fleurs la nuit dedezded dezdze dzaedzaed".substr(0,25)+"..."} </div> 
            </Col>

        </Row>
    </div>
);
}

let styles = {
    libraryBloc: {
        width:'80%',
        backgroundColor: 'white',
        paddingTop:'30px',
        paddingLeft:'30px',
        paddingRight:'30px',
    },

    h3: {
        color:"#23396C",
        fontSize: "16px",
        fontWeight: "500",
        margin: "0px",
        paddingBottom:"10px"
      }
}

export default BookCard;
