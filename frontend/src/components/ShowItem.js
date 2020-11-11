import React, { Component, useState, useEffect } from 'react';
import actions from '../api';
import Modal from "react-modal";
import TheContext from '../TheContext'

function ShowItem(props) {
    console.log(props)
    const { user, setUser, history } = React.useContext(TheContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [allItems, setAllItems] = useState([])

    const [newItem, setNewItem] = useState('')
    const [quantity, setQuantity] = useState('')
    const [checked, setChecked] = useState([])
    const [id, setId] = useState('')
    const [index, setIndex] = useState('')

    console.log(user?.favorites, checked);
    console.log(props)
    useEffect(() => {
        console.log(props)
        if (props.items) {
            setAllItems(props.items)
        }
    }, [props])


    async function handleSubmit(e) {
        e.preventDefault();



        props.editthisitem({
            itemName: newItem,
            quantity: quantity,
            index,
            id: id,
        })/*.then(items => {
            console.log(items, allItems)
            let copyItems = [...allItems]
            copyItems.push({
                itemName: newItem,
                quantity: quantity,
                index,
                id: id,
            })
            setAllItems(copyItems)*/
        //})
        console.log("edit!")
        setModalIsOpen(!modalIsOpen);

    }
    async function edit(each, i) {
        setModalIsOpen(!modalIsOpen);
        setId(each._id);
        setIndex(i);
    }
    // Add Favorites
    async function handleAddFavorites(checkeditem, checked) {
        let res = await actions.addFavorites({ checkeditem, checked });
        console.log(res, setUser)
        //setChecked(res?.data?.favorites);
        //console.log(checked)
        setUser(res?.data)
    }



    const showAllItems = () => {
        console.log(props)
        return allItems?.map((eachItem, i) => {
            console.log(eachItem._id)
            let isFavorite = false;
            if (user?.favorites?.includes(eachItem._id)) {
                isFavorite = true;
            }





            return (




                <div className="itemDisplay">

                    <ul className="itemlist">

                        <li>{eachItem.itemName}</li>
                        <li>{eachItem.quantity}</li>
                        <li ><button className="buttons" onClick={() => edit(eachItem, i)}>Edit</button></li>
                        <li ><button className="buttons" onClick={() => props.deleteAnItem(eachItem._id, i)}> Delete</button></li>
                        <li><input checked={isFavorite ? true : false} type="checkbox" className="checkinput" onChange={(e) => {
                            handleAddFavorites(eachItem._id, e.target.checked)
                        }} ></input></li>



                        {/* <span className="tick"></span> */}

                    </ul>
                    <Modal isOpen={modalIsOpen}>
                        <div onClick={(e) => setModalIsOpen(!modalIsOpen)} className="x">x</div>
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
                            <button id="addGoalButton">Edit Item!!!</button>

                        </form>
                    </Modal>



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
