import React from 'react';
import { Link } from "react-router-dom";
function ShowList(props) {
    console.log(props)
     const showthislist = () =>{
      
      return  props.list?.map( (eachname) =>{
        return (
        <div>
        <Link to={`/list/${eachname._id}`}>
<h1>{eachname.store}</h1>
</Link>
        </div>
        )
        }
        )
    }
        return(
        <div>
        {showthislist()}
            
        </div>
        )

        }


export default ShowList;