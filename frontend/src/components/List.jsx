import React from "react";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import ListItem from "./ListItem.Jsx";
import "../styles/List.css";

const List = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setitemQuantity] = useState(1);
  const listId = 1; // temporarily using this listId.

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8080/api/items/${listId}`
        );
        setItems(result.data.item);
      } catch (error) {
        console.error("failed to fetch items: ", error);
      }
    };
    fetchItems();
  }, []);

  const addItem = async () => {
    try {
      const added = await axios.post(
        `http://localhost:8080/api/items/${listId}`,
        {
          name: itemName,
          quantity: itemQuantity,
        }
      );
      setItems((prevItems) => [...prevItems, added.data.item]);
    } catch (error) {
      console.error("Failed to add item");
    }
  };

  const captureName = (e) => {
    setItemName(e.target.value);
  };

  const captureQuantity = (e) => {
    setitemQuantity(e.target.value);
  };

  return (
    <div className="list-container">
      <h2>List Name</h2>
      <p>This will be a search bar eventually?</p>
      <p>Household: Personal</p>
      <label>Name</label>
      <input type="name" onChange={captureName}></input>
      <label>Quantity</label>
      <input type="quantity" onChange={captureQuantity}></input>

      <button onClick={addItem}>Add</button>
      {items.map((item) => (
        <ListItem
          key={item.item_id}
          itemId={item.item_id}
          name={item.name}
          quantity={item.quantity}
          department={item.department}
          store={item.storename}
          setItems={setItems}
        />
      ))}
    </div>
  );
};

export default List;
