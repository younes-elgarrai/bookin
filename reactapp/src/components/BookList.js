import React, {useState, useEffect} from 'react';
import {Row, Col} from 'antd';
import AliceCarousel from 'react-alice-carousel';
import '../../node_modules/react-alice-carousel/lib/alice-carousel.css';
import '../App.css'
import BookCard from '../components/BookCard'
import Unavailable from '../assets/cover_nondispo.jpg';
import {Link} from 'react-router-dom';



function BookList(props) {

const [epoch, setEpoch] = useState(0);

var size = props.data.length;

function titleCut (desc) {
    if (desc.length > 27){
        return desc.substring(0,24)+"..."
      } else {
          return desc
      };
};

useEffect(() => {
    const interval = setInterval(() => {
      setEpoch(epoch => epoch + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 6 },
    };
  
    const items =  props.data[epoch%size]&&props.data[epoch%size].map((book, index)=>{
        return (
            <div style={styles.bookcard}>
                <Link to={{pathname:"/book/"+book.id}}><img width="100%" height="100%" src={!book.volumeInfo.imageLinks ? Unavailable : book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/></Link>
                {/* <p style={{color:"#333", width:"80%", textAlign:'center', fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {titleCut(book.volumeInfo.title)} </p>  */}
            </div>
            );
    });

return (
<div style={styles.libraryBloc}  className='font'>
    <Row>
        <Col xs={24}>
            <h3 style={styles.h3}>{props.bookListTitle}</h3>
        </Col>
    </Row>
    <Row>
        <AliceCarousel
                        mouseTracking
                        items={items}
                        fadeOutAnimation={true}
                        responsive={responsive}
                        disableButtonsControls={true}
                    />
    </Row>
</div>
);
}

let styles = {
    libraryBloc: {
        justifyContent: 'center',
        width:'80%',
        backgroundColor: 'white',
        paddingTop:'30px',
        paddingLeft:'30px',
        paddingRight:'30px',
    },
    bookcard:{
        display:'flex', 
        flexWrap:"wrap", 
        justifyContent: "center", 
        marginTop:"10px",
        width: "100%",
        height: "220px",
    },

    h3: {
        color:"#23396C",
        fontSize: "16px",
        fontWeight: "500",
        margin: "0px",
        paddingBottom:"10px"
      },

}

export default BookList;
