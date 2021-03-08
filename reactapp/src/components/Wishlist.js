import React, {useEffect, useState} from 'react';
import {Row, Col} from 'antd';
import '../App.css'
import BookCard from './BookCard'
import Unavailable from '../assets/cover_nondispo.jpg';
import { PicCenterOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';


function Wishlist(props) {

    const [displayWishlist, setDisplayWishlist] = useState(false);
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (props.token!==null) {
            var CheckWishList = async () => {
                const data = await fetch(`/wishlist`, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.token}`
                });
                const body = await data.json();
                console.log('bodyCheck', body.wishlist)
                console.log('dataCheck', data)
                if (body.result===true && body.wishlist.length >0) {
                    setDisplayWishlist(true);
                    setResult(body.wishlist);
                }
            };
            CheckWishList();
        }
    },[])

return (
<div style={styles.libraryBloc}  className='font'>
    <Row>
        <Col xs={24}>
            <h3 style={styles.h3}>Ma Wishlist</h3>
        </Col>
    </Row>
    <Row>
        <div style={{display:'flex', flexWrap:"wrap", justifyContent: "center", marginTop:"10px"}}>

            {!displayWishlist 
                ?
                <div> Aucun livre dans votre wishlist </div> 
                :
                <div>
                {result.map((book)=>{
                    return <BookCard  bookId={book.bookid} bookTitle={book.title} bookCover={book.cover}/>;
                })}
                </div>
            }
        </div>
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

    h3: {
        color:"#23396C",
        fontSize: "16px",
        fontWeight: "500",
        margin: "0px",
        paddingBottom:"10px"
      },

}

function mapStateToProps(state) {
    console.log('state', state);
    return { token: state.token, wishlist: state.wishlist }
  }

  export default connect(mapStateToProps, null)(Wishlist);