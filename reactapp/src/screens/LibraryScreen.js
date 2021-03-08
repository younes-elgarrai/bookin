import React, {useState} from 'react';
import Nav from '../components/Navbar';
import Footer from '../components/Footer';
import LibraryHeader from '../components/LibraryHeader';
import Wishlist from '../components/Wishlist';

function LibraryScreen(props) {
    return(
        <div>
            <Nav/>
            <LibraryHeader />
            <Wishlist />
            <Footer/>
        </div>
    )
}
export default LibraryScreen;