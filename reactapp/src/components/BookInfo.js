import React from 'react';
import { Row, Col} from 'antd';
import '../App.css'

function BookInfo() {

return (
<div>
    <div style={styles.container}>
        <Row style={styles.textBloc}>
            <Col xs={24}>
                <h3 style={styles.h3}>Résumé du livre : Le parfum des fleurs la nuit</h3>
                <p style={{color:"#333", fontSize:"14px", fontWeight:"300"}}>Comme un écrivain qui pense que « toute audace véritable vient de l’intérieur », Leïla Slimani n’aime pas sortir de chez elle, et préfère la solitude à la distraction. Pourquoi alors accepter cette proposition d’une nuit blanche à la pointe de la Douane, à Venise, dans les collections d’art de la Fondation Pinault, qui ne lui parlent guère ?Autour de cette « impossibilité » d’un livre, avec un art subtil de digresser dans la nuit vénitienne, Leila Slimani nous parle d’elle, de l’enfermement, du mouvement, du voyage, de l... Voir la suite</p>
            </Col>
        </Row>


        <Row style={styles.textBloc}>
            <Col xs={24} >
                <h3 style={styles.h3}>Plus d'informations</h3>
                <p style={{color:"#333", fontSize:"14px", fontWeight:"300"}}>
                Date de parution : 20 janvier 2021<br />
                Éditeur : Stock<br />
                Nombre pages : 128 pages<br />
                ISBN-13 : 978-2234088306</p>
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
        width:'100%',
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
