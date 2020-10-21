import React, { Component, useState, useEffect } from 'react';
// import actions from '../../api/index'



const Home = (props) => {
  const [store, setStore] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  return( 
<div>
     <section className="tanAddGoal">
          <form
            // onSubmit={handleSubmit}
            style={{ padding: "80px" }}
            class="vanillaForm"
          >
            <label for="Store">Store Name</label>
            <input
              onChange={(e) => setStore(e.target.value)}
              type="text"
              required
              name="Name"
            />
            <label for="Item Name">Item Name</label>
            <input
              onChange={(e) => setItem(e.target.value)}
              type="text"
              required
              name="Start"
            />
            <label for="Quantity">Quantity</label>
            <input
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              required
              name="End"
            />
            <label for="Description">Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              type="textarea"
              required
              name="Description"
              id="descriptBox"
            />
            <br />
            {/* <label>Set Status</label> */}
          
            <br />
            <button id="addGoalButton">Add Goal</button>
          </form>
          </section>
          </div>
  )
}

export default Home;



