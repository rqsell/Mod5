import React, { Component, useState, useEffect } from 'react';
import actions from '../api';
import ShowList from "./ShowList";



const Home = (props) => {
  const [store, setStore] = useState("");
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  console.log(list)
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
    setList([...list, res?.data.list]);
    console.log(res?.data.list)

  }

  return (
    <div>

      <div className="homebody">
        <article className="bodytext">
          <div className="hometext">
            That feeling when you are driving home and realize you forgot that one thing you came to the store for really bums us out.
  <br />
            <br />
  Check Mate helps you manage your shopping list making sure you get everything you came for.
</div>
          <div>
            <button className="makelist" onClick={() => setOpen(!open)}> Make List<div id="tick-mark"></div></button>
            <br />
            <section className="tanAddGoal" id={open ? "clickedmenu" : ""}>
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
                  className="input"
                />

                <button id="addGoalButton">Create List</button>
              </form>
            </section>
          </div>
        </article>
        <article className="bodytexttwo">
          <h1> Click on a list to add items!</h1>
          <ShowList list={list} />
        </article>
      </div>
    </div>
  )
}

export default Home;



