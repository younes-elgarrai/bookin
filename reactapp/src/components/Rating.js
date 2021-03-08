import React , {useState}  from 'react';
import {StarFilled} from '@ant-design/icons';
import '../App.css';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

function Rating(props){
    const [ rating, setRating ] = useState(0);
    console.log('rating>rating', rating);
 
    let displayStars = (nb) => {
        let stars = [];
        for (let i = 0 ; i < 5 ; i++) {
          let starStyle = { fontSize: '20px', color: "#e1e1e1", marginRight:'2px'};
          if (i < nb) { 
            starStyle = { fontSize: '20px', color: "#fca311", marginRight:'2px' }
            } 
          stars.push(<StarFilled style={starStyle} onClick={()=> setRating(i+1)}/>);     
        }
        return stars;
      }

return(
    <div style={{display:'flex'}}>
        {displayStars(rating)}
    </div>
)
}
export default Rating;