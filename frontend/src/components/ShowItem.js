import React, { Component, useState, useEffect } from 'react';
import actions from '../api';
import Modal from "react-modal";


function ShowItem(props) {
    //const [items, setItems] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newItem, setNewItem] = useState('')
    const [quantity, setQuantity] = useState('')
    const [checked, setChecked]= useState('')
    const [id, setId] = useState('')
    const [index, setIndex] = useState('')

    //console.log(items);
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
    async function edit(each, i) {
        setModalIsOpen(!modalIsOpen);
        setId(each._id);
        setIndex(i);
    }
    // Add Favorites
    async function handleAddFavorites(checkeditem) {
      let res = await actions.addFavorites({ checkeditem });
  console.log(res)
      setChecked(res?.data?.favorites);
      console.log(checked)
    }
    const showAllItems = () => {
        console.log(props)
        return props.items.map((eachItem, i) => {
            return (




                <div className="itemDisplay">

                    <ul>
                  
                        <li>{eachItem.itemName}</li>
                        <li>{eachItem.quantity}</li>
                        <li><button onClick={() => edit(eachItem, i)}>Edit</button></li>
                        <li><button onClick={() => props.deleteAnItem(eachItem._id, i)}> Delete</button></li>
                         <li><input type="checkbox" id="cb2" className="tick" onClick={(e) => {
                          handleAddFavorites(eachItem._id)}}
                          /> 

                          <span className="tick"></span></li>
                    
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
                                <button id="addGoalButton">Edit Item</button>
                                
                            </form>
                        </Modal>
                    </ul>


                    {/* <li>{eachItem.itemName}</li>
                    <li>{eachItem.quantity}</li>
                    <div className="buttonbox">
                        <button onClick={() => props.deleteAnItem(eachItem._id, i)}> Delete</button>
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
                    </div> */}
                </div>

            )
        })
    }


    return (
        <div>{showAllItems()}</div>
    )
}

export default ShowItem
