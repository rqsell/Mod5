import React, { Component, useState, useEffect } from 'react';
import actions from '../api';
import ShowList from "./ShowList";



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
        { alert("Sign your butt in!") }
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
<nav>
  <img src = "./CheckMate.png"  className="checklogo"/>
</nav>
<div className= "homebody">
<article className= "bodytext">
  That feeling when you are driving home and realize you forgot that one thing you came to the store for really bums us out.
  <br/>
  <br/>
  Check Mate helps you manage your shopping list making sure you get everything you came for.
</article>
<article className= "bodytexttwo">
<button className = "makelist" onClick={() => setOpen(!open)}> Make List<div id="tick-mark"></div></button>
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
          </article>
          </div>
          </div>
  )
}

export default Home;



