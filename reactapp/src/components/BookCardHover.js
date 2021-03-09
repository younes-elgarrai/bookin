import React, {useEffect, useState} from 'react';
import {Col, Card, Badge, Tooltip} from 'antd';
import '../App.css'
import {Link} from 'react-router-dom';
import Unavailable from '../assets/cover_nondispo.jpg'
import { HeartFilled, BookOutlined, BookFilled, HeartOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import FittedImg from 'react-fitted-img';

function BookCardHover(props) {

    const [LBCardVisible, setLBCardVisible] = useState(false);
    const [WLCardVisible, setWLCardVisible] = useState(false);


    function titleCut (desc) {
        if (desc.length > 25){
            return desc.substring(0,22)+"..."
          } else {
              return desc
          };
    };

    const handleClickWLDelete = async () => {
        if (props.user!==null) {
          const dataDelete = await fetch(`/wishlist/delete/${props.user.token}/${props.bookId}`, {
          method: 'DELETE'
          });
          const bodyDelete = await dataDelete.json();

    
          if (bodyDelete.result===true) {
            props.DeleteToWishList(props.bookId);
          }
        }
      };

    const handleClickLBDelete = async () => {
        if (props.user!==null) {
          const dataDelete = await fetch(`/library/delete/${props.user.token}/${props.bookId}`, {
          method: 'DELETE'
          });
          const bodyDelete = await dataDelete.json();

    
          if (bodyDelete.result===true) {
            props.DeleteToLibrary(props.bookId);
          }
        }
      };

      const handleClickLBAdd = async () => {
        if (props.user!==null) {
          var addLibrary= async () => {
            const data = await fetch(`/library/add/${props.user.token}/${props.bookId}`, {
              method: 'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({"cover":props.bookCover, "title":props.bookTitle})
            });
            const body = await data.json();
            if (body.result===true) {
              props.addToLibrary(props.bookId);
            }
      
          };
          addLibrary();
        }
      };

      const handleClickWLAdd = async () => {
        if (props.user!==null) {
          var addWishList= async () => {
            const data = await fetch(`/wishlist/add/${props.user.token}/${props.bookId}`, {
              method: 'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({"cover":props.bookCover, "title":props.bookTitle})
            });
            const body = await data.json();
            if (body.result===true) {
              props.addToWishList(props.bookId);
            }
      
          };
          addWishList();
        }
      };

    useEffect(() => {
        if (props.user!==null) {
            var CheckLibrary = async () => {
                const data = await fetch(`/library`, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`
                });
                const body = await data.json();

                if (body.result===true) {
                    setLBCardVisible(false);
                    for (let i = 0; i < body.library.length; i++) {
                        if (body.library[i].bookid === props.bookId) { 
                            setLBCardVisible(true)
                        }; 
                    };
                };
            };
            CheckLibrary();
            var CheckWishList = async () => {
                const data = await fetch(`/wishlist`, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`
                });
                const body = await data.json();
                console.log("body.wishlist",body.wishlist);
                console.log("props.bookId",props.bookId)
                if (body.result===true) {
                    setWLCardVisible(false);
                    for (let i = 0; i < body.wishlist.length; i++) {
                        if (body.wishlist[i].bookid === props.bookId) { 
                            setWLCardVisible(true)
                        }; 
                    };
                };
            };
            CheckWishList();
            console.log("LBCardVisible",LBCardVisible);
            console.log("WLCardVisible",WLCardVisible);
        };
    }, [props.library, props.wishlist]);

    const libraryIconAdd = (
      <div style={{display:'flex', justifyContent:'space-around', width:"75px", borderRight:'1px solid #f0f0f0'}}>
        <BookOutlined style={{ color: '#23396c', fontSize:"14px", cursor:"pointer" }} onClick={() => handleClickLBAdd()}  />
      </div>
    )

    const libraryIconDelete = (
      <div style={{display:'flex', justifyContent:'space-around', width:"75px", borderRight:'1px solid #f0f0f0'}}>
        <BookFilled style={{ color: '#23396c', fontSize:"14px", cursor:"pointer" }} onClick={() => handleClickLBDelete()}  />
      </div>
        )

    const wishlistIconAdd = (
      <div style={{display:'flex', justifyContent:'space-around', width:"75px"}}>
        <HeartOutlined style={{ color: '#23396c', fontSize:"14px", cursor:"pointer" }} onClick={() => handleClickWLAdd()}  />
      </div>
    )

    const wishlistIconDelete = (
      <div style={{display:'flex', justifyContent:'space-around', width:"75px"}}>
          <HeartFilled style={{ color: '#23396c', fontSize:"14px", cursor:"pointer" }} onClick={() => handleClickWLDelete()}  />
      </div>
    )


return (
 
        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ display:'flex', flexDirection:'column', justifyContent:'space-evenly', alignItems:'center', margin:'5px', marginBottom:"15px", flexWrap:"wrap"}} >
            <div style={{borderRight:'1px solid #f0f0f0', borderLeft:'1px solid #f0f0f0', borderTop:'1px solid #f0f0f0', width:"151px"}}>
            <Link to={{pathname:"/book/"+props.bookId}}><FittedImg fit="cover" width={150} height={220}  src={!props.bookCover ? Unavailable : props.bookCover} alt={props.bookTitle} /></Link>
            <div style={{color:"#333", fontSize:"12px", fontWeight:"400", width:"150px", padding:"5px", textAlign:"center", verticalAlign:""}}> {titleCut(props.bookTitle)} </div>
            </div>
            {props.context === "library" 
            ?
            <div style={{border:'1px solid #f0f0f0', display:'flex', justifyContent:'space-around', width:"150px", height:"30px", alignItems:"center"}}>
            {LBCardVisible ? libraryIconDelete : libraryIconAdd}
            {WLCardVisible ? wishlistIconDelete : wishlistIconAdd}
            </div>
            :
            <div style={{border:'1px solid #f0f0f0', display:'flex', justifyContent:'space-around', width:"150px", height:"30px", alignItems:"center"}}>
            {LBCardVisible ? libraryIconDelete : libraryIconAdd}
            {WLCardVisible ? wishlistIconDelete : wishlistIconAdd}
            </div>
            }

         </Col>
        
);
}

function mapDispatchToProps(dispatch) {
    return {
        addToWishList: function(bookId) {
            dispatch( {type: 'addToWishList', bookId:bookId} )
        }, 
      DeleteToWishList: function(bookId) {
        dispatch( {type: 'DeleteToWishList', bookId:bookId} )
      },
      addToLibrary: function(bookId) {
        dispatch( {type: 'addToLibrary', bookId:bookId} )
      }, 
      DeleteToLibrary: function(bookId) {
        dispatch( {type: 'DeleteToLibrary', bookId:bookId} )
      },
    };
  };


function mapStateToProps(state) {
    console.log('state', state);
    return { user: state.user, wishlist: state.wishlist, library: state.library }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BookCardHover);