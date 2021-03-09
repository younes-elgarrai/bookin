import React, {useEffect, useState} from 'react';
import {Row, Col} from 'antd';
import Grid from '@material-ui/core/Grid';
import '../App.css'
import BookCardHover from './BookCardHover'
import { connect } from 'react-redux';

function MyLibrary(props) {

    const [displayLibrary, setDisplayLibrary] = useState(false);
    const [result, setResult] = useState([]);


    useEffect(() => {
        if (props.user!==null) {
            var CheckLibrary = async () => {
                const data = await fetch(`/library`, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`
                });
                const body = await data.json();
                console.log('bodyCheck', body)
                console.log('dataCheck', data)
                if (body.result===true && body.library.length >0) {
                    setDisplayLibrary(true);
                    setResult(body.library);
                } else if (body.result===true && body.library.length === 0) {
                    setDisplayLibrary(false);
                };
            };
            CheckLibrary();

        };
    },[props.wishlist, props.library]);




return (
<div style={styles.libraryBloc}  className='font'>
    <Row>
        <Col xs={24}>
            <h3 style={styles.h3}>Ma Bibliothèque</h3>
        </Col>
    </Row>

        <div>

            {!displayLibrary
                ?
                <div> Aucun livre dans votre bibliothèque </div> 
                :
                <div style={{display:'flex', flexWrap:"wrap" ,justifyContent:"flex-start", marginTop:"0px"}}>
                {result.map((book)=>(
                    <BookCardHover  bookId={book.bookid} bookTitle={book.title} bookCover={book.cover} context="library"/>
                ))}
                </div>
            }
        </div>



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
    return { user: state.user, wishlist: state.wishlist, library: state.library }
  }

  export default connect(mapStateToProps, null)(MyLibrary);