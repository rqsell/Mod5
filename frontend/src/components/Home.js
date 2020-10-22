import React, { Component, useState, useEffect } from 'react';
import actions from '../api'



const Home = (props) => {
  const [store, setStore] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    // let res = await axios.post(`http://localhost:5000/api/AddAGoal`, {

    let res = await actions.addalist({
      store: store,
     
    });

  }
  
  return( 
<div>
     <section className="tanAddGoal">
          <form
            onSubmit={handleSubmit}
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
           
            <button id="addGoalButton">Add Goal</button>
          </form>
          </section>
          </div>
  )
}

export default Home;



