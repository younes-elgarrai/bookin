import React, {useEffect, useState} from 'react';
import {Row, Col} from 'antd';
import Grid from '@material-ui/core/Grid';
import '../App.css'
import BookCardHover from './BookCardHover'
import { connect } from 'react-redux';

function MyLibrary(props) {

    const [displayLibrary, setDisplayLibrary] = useState(null);
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
                    props.setLibrary(body.library);
                } else if (body.result===true && body.library.length === 0) {
                    setDisplayLibrary(false);
                    props.setLibrary(body.library);
                };
            };
            CheckLibrary();

        };
    },[]);


var library = props.library.map((book)=>{
                    return(
                    <Grid container xs={2} direction="row" justify="center" alignItems="center">
                        <BookCardHover  bookId={book.bookid} bookTitle={book.title} bookCover={book.cover} context="library"/>
                    </Grid>
                    );
                }
                );

return (
<div style={styles.libraryBloc}  className='font'>
    <Grid container xs={12} direction="column" justify="flex-start" alignItems="center">
        <Grid container xs={10} direction="row" justify="center" alignItems="center">
            {!displayLibrary
                ?
                <Grid item xs={12} >
                    <p style={{textAlign:"center"}} >Aucun livre dans votre bibliothèque</p>  
                </Grid> 
                :library
            }
        </Grid>
    </Grid>
</div>
);
}

let styles = {
    libraryBloc: {
        backgroundColor: 'white',
    },

    h3: {
        color:"#23396C",
        fontSize: "16px",
        fontWeight: "500",
        margin: "0px",
        paddingBottom:"10px",
        paddingTop:"10px",
        marginLeft:"50px"
      },
      note: {
        color:'#ffffff',
        fontSize: '16px',
        fontWeight: '200',
    }

}

function mapDispatchToProps(dispatch) {
    return {
      setLibrary: function(library) {
          dispatch( {type: 'setLibrary', library:library} )
      }, 
    }
};


function mapStateToProps(state) {
    console.log('state', state);
    return { user: state.user, wishlist: state.wishlist, library: state.library }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(MyLibrary);