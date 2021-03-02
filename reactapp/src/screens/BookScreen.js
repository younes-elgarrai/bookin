import React from 'react';
import { Avatar, Layout, Row, Col} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../components/BookHeader'
import '../App.css';
import Nav from '../components/Navbar';

import BookHeader from '../components/BookHeader';
import BookInfo from '../components/BookInfo'
import Review from '../components/Review'
import BookCard from '../components/BookCard'

const { Content } = Layout;

function BookScreen() {
  return (
    <Content style={styles.container}>
            <BookHeader/>
            <BookInfo/>

            {/* Bloc librairies avec le même livre */}
        <div style={styles.libraryBloc}>
            <Row>
            <Col xs={24}>
                <h3 style={styles.h3}>Ils ont ajouté ce livre à leur bibliothèque </h3>
            </Col>
            </Row>
            <Row>
            <Col style={{marginBottom:'5px'}}xs={8} md={2}><Avatar size={64} icon={<UserOutlined />} /></Col>
            <Col style={{marginBottom:'5px'}}xs={8} md={2}><Avatar size={64} icon={<UserOutlined />} /></Col>
            <Col style={{marginBottom:'5px'}}xs={8} md={2}><Avatar size={64} icon={<UserOutlined />} /></Col>
            <Col style={{marginBottom:'5px'}}xs={8} md={2}><Avatar size={64} icon={<UserOutlined />} /></Col>
            </Row>
        </div>

       
        <BookCard/>
        <Review/>
</Content>
);
}

let styles = {
    container: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        backgroundColor:'#f3f5f7',
    },

    libraryBloc: {
        width:'80%',
        backgroundColor: 'white',
        paddingLeft:'30px',
        paddingTight:'30px',
        paddingTop: '30px',
    },

    h3: {
        color:"#23396C",
        fontSize: "16px",
        fontWeight: "500",
        margin: "0px",
        paddingBottom:"10px"
      }
}

export default BookScreen;
