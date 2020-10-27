
import React, { Component, useState, useEffect } from 'react';
import actions from '../api';
import ShowItem from '../components/ShowItem'

function AddItems(props) {
  const [item, setItem] = useState([]);
  const [quantity, setQuantity] = useState();
  const [id, setId] = useState('')
  const [items, setItems] = useState([]);


  async function deleteAnItem(id, i) {
    let res = await actions.DeleteItem(id)
    console.log(res)
    let updatedItems = [...items]
    updatedItems.splice(i, 1)
    setItems(updatedItems)
  }


  async function editthisitem(data) {
    let res = await actions.editanitem(data);
    let index = data.index;
    console.log(res);
    let updatedItems = [...item];
    updatedItems.splice(index, 1, data);
    setItems(updatedItems);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.timeLog(props)

    let res = await actions.additem({

      itemName: item,
      quantity: quantity,
      listId: props.match.params.listid,

    });

  }




  return (
    <div>
      <section className="twotanAddGoal">
        <form
          onSubmit={handleSubmit}
          style={{ padding: "80px" }}
          class="vanillaForm"
        >
          <label for="Store">Item Name</label>
          <input
            onChange={(e) => setItem(e.target.value)}
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
          <button id="addGoalButton">add item</button>
        </form>
      </section>
      <ShowItem {...props} item={items} editthisitem={editthisitem} deleteAnItem={deleteAnItem} />
    </div>
  );
}

export default AddItems;