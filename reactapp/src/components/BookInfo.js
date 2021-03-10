import React from 'react';
import { Row, Col} from 'antd';
import '../App.css'
var striptags = require('striptags');

function BookInfo(props) {
    var date = new Date (props.publishedDate);
    date = date.toLocaleDateString('fr-FR');

return (
<div>
    <div style={styles.container}  >
        <Row style={styles.textBloc}>
            <Col xs={24} md={16} xl={18}>
                <h3 style={styles.h3}>Résumé du livre : {props.bookTitle}</h3>
                <p style={{color:"#333", fontSize:"14px", fontWeight:"300", marginRight:"30px", textAlign:'justify'}}>
                {striptags(props.bookDesc)}
                </p>
            </Col>

            <Col xs={24} md={8} xl={6} >
                <h3 style={styles.h3}>Plus d'informations</h3>
                <p style={{color:"#333", fontSize:"14px", fontWeight:"300"}}>
                Date de parution : {date}<br />
                Éditeur : {props.bookPublisher}<br />
                Nombre pages : {props.bookPageCount}<br />
                ISBN-13 : {props.bookIsbn}</p>
            </Col>
        </Row>
    </div>
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

    textBloc: {
        display:"flex",
        justifyContent: "center",
        width:"80%",
        backgroundColor: "white",
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

export default BookInfo;
