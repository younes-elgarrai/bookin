import React, {useState, useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import '../../node_modules/react-alice-carousel/lib/alice-carousel.css';
import '../App.css'

import Skeleton from '@material-ui/lab/Skeleton';
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
                <Grow in={true}>
                    <Link to={{pathname:"/book/"+book.id}}><img width="100%" height="100%" src={!book.volumeInfo.imageLinks ? Unavailable : book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/></Link>
                </Grow>
                {/* <p style={{color:"#333", width:"80%", textAlign:'center', fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {titleCut(book.volumeInfo.title)} </p>  */}
            </div>
            );
    });

    const skeletonArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map((num, index)=>{
        return ( 
        <div style={styles.bookcard}>
            <Skeleton variant="rect" width="130px" height="210px" />
        </div>);
    });

    var array = props.skeleton?skeletonArray:items;
    var text = props.skeleton?<Skeleton variant="text" style={{width:"200px"}}/>:<h3 style={styles.h3}>{props.bookListTitle}</h3>;

return (
        <Grid container style={styles.libraryBloc}  className='font'>
                <Grid xs={12}>
                    {text}
                </Grid>
                <Grid xs={12}>
                    <AliceCarousel
                                    mouseTracking
                                    items={array}
                                    fadeOutAnimation={true}
                                    responsive={responsive}
                                    disableButtonsControls={true}
                                />
                </Grid>
        </Grid>
);
}

let styles = {
    libraryBloc: {
        justifyContent: 'center',
        width:'90%',
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
        height: "210px",
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
