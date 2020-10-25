import React, { Component, useState, useEffect } from 'react';
import actions from '../api'
import ShowList from "./ShowList"



const Home = (props) => {
  const [store, setStore] = useState("");
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
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
<div className= 'intro'>
<h1> Get It</h1>
<h2> Here at Get It we believe in making sure that when you make the trek to go to the store you get everything you came for. Start the process by clicking the logo below</h2>
</div>
<img src ="./GetIt.png"  className= 'logo'onClick={() => setOpen(!open)}/>
     <section className="tanAddGoal"  id={open ? "clickedmenu" : ""}>
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
           
            <button id="addGoalButton">Create List</button>
          </form>
          </section>
          <ShowList list ={list}/>
          </div>
  )
}

export default Home;



