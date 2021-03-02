import React from 'react';
import { Row, Col} from 'antd';
import '../App.css'
import BookHeader from './BookHeader';

function BookInfo(props) {

return (
<div>
    <div style={styles.container}  className='font'>
        <Row style={styles.textBloc}>
            <Col xs={24}>
                <h3 style={styles.h3}>Résumé du livre : {props.bookTitle}</h3>
                <p style={{color:"#333", fontSize:"14px", fontWeight:"300"}}>{props.bookDesc}</p>
            </Col>
        </Row>


        <Row style={styles.textBloc}>
            <Col xs={24} >
                <h3 style={styles.h3}>Plus d'informations</h3>
                <p style={{color:"#333", fontSize:"14px", fontWeight:"300"}}>
                Date de parution : {props.publishedDate}<br />
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
