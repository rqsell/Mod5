
import React, { Component, useState, useEffect } from 'react';
import actions from '../api';

function AddItems(props) {
  const [item, setItem] = useState([]);
  const [quantity, setQuantity] = useState();


  async function handleSubmit(e) {
    e.preventDefault();


    let res = await actions.additem({
      itemName: item,
      quantity: quantity,

    });

  }








  return (
    <div>
      <section className="tanAddGoal">
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
    </div>
  );
}

export default AddItems;