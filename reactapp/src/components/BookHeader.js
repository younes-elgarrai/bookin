import React from 'react';
import { Button, Row, Col, Image, Rate} from 'antd';
import '../App.css'


function BookHeader() {

  return (
    <div style={styles.container}>
      <Row style={styles.bookBloc} >
        <Col xs={24} md={8} xl={5} >
        <Image className="livre" width={150}
        src='https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg'
        alt='Le parfum des fleurs la nuit'
      />
        </Col>

        <Col xs={24} md={12} xl={12} >
        <h1 style={styles.h1} className='font'>Le parfum des fleurs la nuit</h1>
        <h2 style={styles.h2} className='font'><a href='https://livre.fnac.com/a15106090/Leila-Slimani-Le-parfum-des-fleurs-la-nuit' target="_blank" rel="noreferrer" className='link'>Leila Slimani</a></h2>
        
        <div>

        <Rate allowHalf defaultValue={3,5} />
        <p style={styles.note} className='font'>Note 3,5/5 | 12 avis</p>
        </div>
        
        
        <div>
        <Button className='font' style={{marginRight:'10px',  backgroundColor:'#e5e5e5', color:'#23396c',borderColor:'#23396c', borderRadius:'5px'}}>Roman</Button>
        <Button className='font' style={{marginRight:'10px', backgroundColor:'#e5e5e5', color:'#23396c', borderColor:'#23396c', borderRadius:'5px'}}>Best Seller</Button>
        </div>
        </Col>
    </Row>

    <Row className="buyBloc">
      <div>
        <Col xs={24}>
        <Button className='font' style={{marginRight:'10px',  backgroundColor:'#fca311', fontWeight:'500', color:'#23396c', borderColor:'#fca311', borderRadius:'5px'}}>J'AI LU</Button>
        <Button className='font' style={{marginRight:'10px',  backgroundColor:'#fca311', fontWeight:'500', color:'#23396c', borderColor:'#fca311', borderRadius:'5px'}}>JE VEUX LIRE</Button>
        <Button className='font' style={{marginRight:'10px',  backgroundColor:'#e5e5e5', fontWeight:'500', color:'#23396c', borderColor:'#23396c', borderRadius:'5px'}}>J'ACHETE</Button>
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
        width:'100%',
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
        // background-image: url('./assets/picto.png'),
        backgroundSize: '20%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom',
    },

    h1: {
        color:'white',
        fontSize: '20px',
        fontWeight: '700',
        margin: '0px',
    },

    h2: {
        color:'#ffffff',
        fontSize: '16px',
        fontWeight: '400',
        margin: '0px',
    },

    note: {
        color:'#ffffff',
        fontSize: '12px',
        fontWeight: '200',
    }
  }

export default BookHeader;

