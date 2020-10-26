
import React, { Component, useState, useEffect } from 'react';
import actions from '../api';
import ShowItem from '../components/ShowItem'

function AddItems(props) {
  const [item, setItem] = useState([]);
  const [quantity, setQuantity] = useState();
  const [id, setId] = useState('')

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
          <button id="addGoalButton">Add Item</button>
        </form>
      </section>
      <ShowItem {...props} item = {item} />
    </div>
  );
}

export default AddItems;