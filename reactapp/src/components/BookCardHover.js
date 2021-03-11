import React, {useEffect, useState} from 'react';
import {Col, Tooltip, message} from 'antd';
import '../App.css'
import {Link} from 'react-router-dom';
import Unavailable from '../assets/cover_nondispo.jpg'
import { HeartFilled, BookOutlined, BookFilled, HeartOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import FittedImg from 'react-fitted-img';

function BookCardHover(props) {

    const [LBCardVisible, setLBCardVisible] = useState(false);
    const [WLCardVisible, setWLCardVisible] = useState(false);


    var titleCutDone = function titleCut () {
      if (props.bookTitle > 21){
          return props.bookTitle.substring(0,21)+"..."
        } else {
            return props.bookTitle
        };
  };

    const handleClickWLDelete = async () => {
        if (props.user!==null) {
          const dataDelete = await fetch(`/wishlist/delete/${props.user.token}/${props.bookId}`, {
          method: 'DELETE'
          });
          const bodyDelete = await dataDelete.json();

    
          if (bodyDelete.result===true) {
            var index;
            for (let i = 0; i < props.wishlist.length; i++) {
              if (props.wishlist[i].bookid === props.bookId) {
                index = i;
              }
            }
            props.DeleteToWishList(props.bookId, index);
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
            var index;
            for (let i = 0; i < props.library.length; i++) {
              if (props.library[i].bookid === props.bookId) {
                index = i;
              }
            }
            props.DeleteToLibrary(props.bookId, index);
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
        };
    }, [props.library, props.wishlist]);

    const key = 'libraryIconAdd';

    const messageAddLB = () => {
        message.success({ content: 'Ajouté à votre bibliothèque !', key, duration: 2 });
    };

    const messageAddWL = () => {
      message.success({ content: 'Ajouté à votre wishlist !', key, duration: 2 });
    };

    const messageDeleteLB = () => {
      message.success({ content: 'Retiré de votre bibliothèque !', key, duration: 2 });
    };

    const messageDeleteWL = () => {
      message.success({ content: 'Retiré de votre wishlist !', key, duration: 2 });
    };

    const libraryIconAdd = (
      <div style={{display:'flex', justifyContent:'space-around', width:"75px", borderRight:'1px solid #f0f0f0'}}>
        <Tooltip placement="bottom" title="Ajoutez à votre bibliothèque">
        <BookOutlined style={{ color: '#23396c', fontSize:"14px", cursor:"pointer" }} onClick={() => {handleClickLBAdd(); messageAddLB()}}  />
        </Tooltip>
      </div>
    )

    const libraryIconDelete = (
      <div style={{display:'flex', justifyContent:'space-around', width:"75px", borderRight:'1px solid #f0f0f0'}}>
        <Tooltip placement="bottom" title="Retirez de votre bibliothèque">
        <BookFilled style={{ color: '#23396c', fontSize:"14px", cursor:"pointer" }} onClick={() => {handleClickLBDelete(); messageDeleteLB()}}  />
        </Tooltip>
      </div>
        )

    const wishlistIconAdd = (
      <div style={{display:'flex', justifyContent:'space-around', width:"75px"}}>
        <Tooltip placement="bottom" title="Ajoutez à votre wishlist">
        <HeartOutlined style={{ color: '#23396c', fontSize:"14px", cursor:"pointer" }} onClick={() => {handleClickWLAdd(); messageAddWL()}}  />
        </Tooltip>
      </div>
    )

    const wishlistIconDelete = (
      <div style={{display:'flex', justifyContent:'space-around', width:"75px"}}>
          <Tooltip placement="bottom" title="Retirez de votre wishlist">
          <HeartFilled style={{ color: '#23396c', fontSize:"14px", cursor:"pointer" }} onClick={() => {handleClickWLDelete(); messageDeleteWL()}}  />
          </Tooltip>
      </div>
    )


return (
 
        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{ display:'flex', flexDirection:'column', justifyContent:'space-evenly', alignItems:'center', margin:'5px', marginBottom:"15px", flexWrap:"nowrap"}} >
            <div style={{borderRight:'1px solid #f0f0f0', borderLeft:'1px solid #f0f0f0', borderTop:'1px solid #f0f0f0', width:"151px"}}>
            <Link to={{pathname:"/book/"+props.bookId}}><FittedImg fit="fill" width={128} height={210}  src={!props.bookCover ? Unavailable : props.bookCover} alt={props.bookTitle} /></Link>
            <div style={{color:"#333", fontSize:"12px", fontWeight:"400", width:"150px", padding:"5px", textAlign:"center", verticalAlign:""}}> {titleCutDone} </div>
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
      DeleteToWishList: function(bookId, index) {
        dispatch( {type: 'DeleteToWishList', bookId:bookId, index:index} )
      },
      addToLibrary: function(bookId) {
        dispatch( {type: 'addToLibrary', bookId:bookId} )
      }, 
      DeleteToLibrary: function(bookId, index) {
        dispatch( {type: 'DeleteToLibrary', bookId:bookId, index:index} )
      },
    };
  };


function mapStateToProps(state) {
    console.log('state', state);
    return { user: state.user, wishlist: state.wishlist, library: state.library }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BookCardHover);