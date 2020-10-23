import React, { Component, useState, useEffect } from 'react';
import actions from '../api'
import ShowList from "./ShowList"



const Home = (props) => {
  const [store, setStore] = useState("");
  const [list, setList] = useState([]);
  
  useEffect(() => {
    async function getList() {
      let res = await actions.getList();
      if (res) {
        console.log(res);
        setList(res.data?.list);
      } else {
        {alert("Sign your butt in!")}
      }
    }
    getList();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
   

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
          <ShowList list ={list}/>
          </div>
  )
}

export default Home;



