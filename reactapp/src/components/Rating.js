import React , {useState}  from 'react';
import {StarFilled} from '@ant-design/icons';
import '../App.css';

function Rating(props){
  const [ rating, setRating ] = useState(0);
  // console.log('Rating Component > rating', rating);
  // console.log('Rating Component > props rating', props.rate);

    let displayStars = (nb) => {
        let stars = [];
        for (let i = 0 ; i < 5 ; i++) {
          let starStyle = { fontSize: '20px', color: "#e1e1e1", marginRight:'2px'};
          if (i < nb) { 
            starStyle = { fontSize: '20px', color: "#fca311", marginRight:'2px' }
            } 
          stars.push(<StarFilled style={starStyle}/>);     
        }
        return stars;
      }

return(
    <div style={{display:'flex'}}>
        {props.rate ? displayStars(props.rate) : displayStars(rating)}
    </div>
)
}
export default Rating;