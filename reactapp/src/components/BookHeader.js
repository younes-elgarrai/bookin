import React from 'react';
import { Button, Row, Col} from 'antd';
import { StarFilled} from '@ant-design/icons';
import '../App.css'
import Background from '../assets/picto.png'
import Cover from '../assets/cover.jpg'


function BookHeader(props) {

  return (
    <div style={styles.container} className='font'>
      <Row style={styles.bookBloc}  >
        <Col xs={24} md={8} xl={5} >
        <img width={150}
        src={!props.bookCover ? `${Cover}` : props.bookCover}
        alt={props.bookTitle}
      />
  
              
        </Col>

        <Col xs={24} md={12} xl={12} >
        <h1 style={styles.h1}>{props.bookTitle}</h1>
        <h2 style={styles.h2}><a href='https://livre.fnac.com/a15106090/Leila-Slimani-Le-parfum-des-fleurs-la-nuit' target="_blank" rel="noreferrer" style={styles.link}>{props.bookAuthor}</a></h2>
        
        <div>

        <StarFilled style={{fontSize: '20px', color:"#fca311", marginRight:'2px'}}/>
        <StarFilled style={{fontSize: '20px', color:"#fca311", marginRight:'2px'}}/>
        <StarFilled style={{fontSize: '20px', color:"#fca311", marginRight:'2px'}}/>
        <StarFilled style={{fontSize: '20px', color:"#fca311", marginRight:'2px'}}/>
        <StarFilled style={{fontSize: '20px', color:"#e1e1e1", marginRight:'2px'}}/>

        <p style={styles.note} >Note 3,5/5 | 12 avis</p>
        </div>
        
        
        <div>
        <Button style={{marginRight:'10px',  backgroundColor:'#e5e5e5', color:'#23396c',borderColor:'#23396c', borderRadius:'5px'}}>Roman</Button>
        <Button style={{marginRight:'10px', backgroundColor:'#e5e5e5', color:'#23396c', borderColor:'#23396c', borderRadius:'5px'}}>Best Seller</Button>
      </div>
        </Col>
    </Row>

    <Row style={styles.buyBloc}>
      <div>
        <Col xs={24}>
        <Button style={{marginRight:'10px',  backgroundColor:'#fca311', fontWeight:'500', color:'#23396c', borderColor:'#fca311', borderRadius:'5px'}}>J'AI LU</Button>
        <Button style={{marginRight:'10px',  backgroundColor:'#fca311', fontWeight:'500', color:'#23396c', borderColor:'#fca311', borderRadius:'5px'}}>JE VEUX LIRE</Button>
        {/* <Button onClick={()=> window.open(${annonceInfo?.websiteLink}, "_blank")} style={{marginRight:'10px',  backgroundColor:'#e5e5e5', fontWeight:'500', color:'#23396c', borderColor:'#23396c', borderRadius:'5px'}}>J'ACHETE</Button> */}

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


