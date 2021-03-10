import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import '../App.css'
import BookCardHover from './BookCardHover'
import { connect } from 'react-redux';

function MyWishlist(props) {

    const [displayWishlist, setDisplayWishlist] = useState(true);
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (props.user!==null) {
            var CheckWishList = async () => {
                const data = await fetch(`/wishlist`, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`
                });
                const body = await data.json();
                console.log('bodyCheck', body)
                console.log('dataCheck', data)
                if (body.result===true && body.wishlist.length >0) {
                    setDisplayWishlist(true);
                    setResult(body.wishlist);
                    // props.setWishlist(body.wishlist);
                } else if (body.result===true && body.wishlist.length === 0) {
                    setDisplayWishlist(false);
                    // props.setWishlist(body.wishlist);
                }; 
            };
            CheckWishList();

        };
    },[]);



var wishlist = props.wishlist.map((book)=>{
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
            {!displayWishlist 
                ?
                <Grid item xs={12} >
                    <p style={{textAlign:"center"}}>Aucun livre dans votre wishlist</p>  
                </Grid> 
                :wishlist
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
      setWishlist: function(wishlist) {
          dispatch( {type: 'setWishlist', wishlist:wishlist} )
      }, 
    }
};

function mapStateToProps(state) {
    console.log('state', state);
    return { user: state.user, wishlist: state.wishlist, library: state.library }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(MyWishlist);