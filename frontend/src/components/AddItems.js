import React from 'react';

function AddItems(props) {
    return (
        <div>
            <section className="tanAddGoal">
          <form
            // onSubmit={handleSubmit}
            style={{ padding: "80px" }}
            class="vanillaForm"
          >
            <label for="Store">Item Name</label>
            <input
            //   onChange={(e) => setStore(e.target.value)}
              type="text"
              required
              name="Name"
            />
            <label for="Store">Quantity</label>
            <input
            //   onChange={(e) => setStore(e.target.value)}
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