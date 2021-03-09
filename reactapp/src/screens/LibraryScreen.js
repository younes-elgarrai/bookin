import React, {useState} from 'react';
import Nav from '../components/Navbar';
import Footer from '../components/Footer';
import LibraryHeader from '../components/LibraryHeader';
import MyWishlist from '../components/MyWishlist';
import MyLibrary from '../components/MyLibrary';

function LibraryScreen(props) {
    return(
        <div>
            <Nav/>
            <LibraryHeader />
            <MyWishlist />
            <MyLibrary />
            <Footer/>
        </div>
    )
}
export default LibraryScreen;