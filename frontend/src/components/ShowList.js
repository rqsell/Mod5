import React from 'react';

function ShowList(props) {
    console.log(props)
     const showthislist = () =>{
      
      return  props.list?.map( (eachname) =>{
        return (
        <div>
<h1>{eachname.store}</h1>
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