
import React, { Component, useState, useEffect } from 'react';
import actions from '../api';
import ShowItem from '../components/ShowItem'


function AddItems(props) {
  const [item, setItem] = useState([]);
  const [quantity, setQuantity] = useState();
  const [id, setId] = useState('')
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function getItem() {

      let res = await actions.getItem({ listid: props.match.params.listid });
      if (res) {
        console.log(res);
        setItems(res.data?.items);
      } else {
        { alert("Sign your butt in!") }
      }
    }

    getItem();
  }, []);

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
    console.log(res)
    console.log(items)
    let newListOfItems = [...items]
    newListOfItems.push(res?.data.item)
    setItems(newListOfItems)



  }




  return (
    <div>
      {/* <section className="twotanAddGoal">
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
      </section> */}
      <div>Grocery items</div>
      <div class="main">
        <form onSubmit={handleSubmit}>
        <label class="hello"> </label>
          <input onChange={(e) => setItem(e.target.value)} type="text" class="write" placeholder="Item"></input>

          <span class="enter"></span>

          <label class="hello"> </label>
          <input onChange={(e) => setQuantity(e.target.value)} type="text" class="write" placeholder="Quantity"></input>

          <div className="box-1">

            <button className="btn btn-one">Add Item?</button>

          </div>
        </form>
      </div>
      <table>

        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </table>
      <ShowItem {...props} items={items} editthisitem={editthisitem} deleteAnItem={deleteAnItem} />
    </div>




  );
}

export default AddItems;