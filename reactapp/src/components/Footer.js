import React from 'react';
import '../App.css';
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined, TwitterOutlined} from '@ant-design/icons';

function Footer() {
    return (
            <footer className='font' style={styles.footer}>
                <div style={styles.social}>
                <FacebookOutlined style={styles.icons} /><InstagramOutlined style={styles.icons} /><YoutubeOutlined style={styles.icons} /><TwitterOutlined style={styles.icons} />
                </div>
                <p>Qui sommes-nous | C.G.V. | Nous contacter</p>
                <p>© book_in 2021</p>
            </footer>
    );
}
const styles = {
    footer:{
        backgroundColor:'#E5E5E5',
        color: '#23396C',
        fontSize:'12px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        paddingTop: '20px',
        paddingBottom:'10px'
    },
    social:{
        display:'flex',
        width: '20%',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:'10px'
    },
    icons:{
        fontSize:'24px',
        marginRight:'10px'
    }
}
export default Footer;