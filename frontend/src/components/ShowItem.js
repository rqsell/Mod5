

import React, { Component, useState, useEffect } from 'react';
import actions from '../api';

function ShowItem(props) {
    const [item, setItem] = useState([])
    useEffect(() => {
        async function getItem() {
           
            let res = await actions.getItem({ listid: props.match.params.listid });
            if (res) {
                console.log(res);
                setItem(res.data?.items);
            } else {
                { alert("Sign your butt in!") }
            }
        }
        getItem();
    }, []);
    console.log(item);
 const showAllItems = () =>{
     return item.map((eachItem)=>{
   return (
       <div className="itemDisplay">
<li>{eachItem.itemName}</li>
<li>{eachItem.quantity}</li>
       </div>
     
   )  
     })
 }


    return (
        <div>{showAllItems()}</div>
    )
}

export default ShowItem
