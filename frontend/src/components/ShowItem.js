import React, { Component, useState, useEffect } from 'react';
import actions from '../api';
import Modal from "react-modal";


function ShowItem(props) {
    const [item, setItem] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newItem, setNewItem] = useState('')
    const [quantity, setQuantity] = useState('')
    const [id, setId] = useState('')
    const [index, setIndex] = useState('')
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
    async function handleSubmit(e) { 
        e.preventDefault();

        props.editthisitem({
          itemName: newItem,
          quantity: quantity,
          index,
          id: id,
        }); 
        console.log("edit!")
        setModalIsOpen(!modalIsOpen); 
     }
     async function edit(each, i){
        setModalIsOpen(!modalIsOpen);
        setId(each._id);
        setIndex(i);
     }
 const showAllItems = () =>{
   console.log(props)
     return item.map((eachItem, i)=>{
   return (
       <div className="itemDisplay">
<li>{eachItem.itemName}</li>
<li>{eachItem.quantity}</li>
<div className= "buttonbox">
    <button> Delete</button>
    <button onClick={() => edit(eachItem, i)}>Edit</button>
    <Modal isOpen={modalIsOpen}>
    <form
          onSubmit={handleSubmit}
          style={{ padding: "80px" }}
          class="vanillaForm"
        >
          <label for="Store">Item Name</label>
          <input
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            required
            name="Name"
          />
          <label for="Store">Quantity</label>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="text"
            required
            name="Name"
          />
          <button id="addGoalButton" >Edit Item</button>
        </form>
    </Modal>
</div>
       </div>
     
   )  
     })
 }


    return (
        <div>{showAllItems()}</div>
    )
}

export default ShowItem
