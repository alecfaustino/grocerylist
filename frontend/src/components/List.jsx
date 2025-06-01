import React from "react";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import ListItem from "./ListItem.Jsx";

const List = () => {
  const [items, setItems] = useState([]);
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
  }, [items]);
  return (
    <div>
      <h2>List Name</h2>
      <p>Household: Personal</p>
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
