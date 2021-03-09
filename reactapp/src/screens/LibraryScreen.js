import React, {useState} from 'react';
import Nav from '../components/Navbar';
import Footer from '../components/Footer';
import LibraryHeader from '../components/LibraryHeader';
import MyWishlist from '../components/MyWishlist';
import MyLibrary from '../components/MyLibrary';
import ReviewCard from '../components/ReviewCard';
import NewReview from '../components/NewReview';

function LibraryScreen(props) {
    return(
        <div className='font'>
            <Nav/>
            <div style={styles.container}>
                <LibraryHeader />
                <MyWishlist />
                <MyLibrary />
                <NewReview/>
            </div>
            <Footer/>
        </div>
    )
}
const styles = {
    container: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        backgroundColor:'#f3f5f7',
        padding:'20px',
        margin:'auto'
    }
}

export default LibraryScreen;