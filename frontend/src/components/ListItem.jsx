import React from "react";
import "../styles/ListItem.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ListItem.css";
import { useState } from "react";

const ListItem = ({ name, quantity, department, store, itemId, setItems }) => {
  const [cardEdit, setCardEdit] = useState(false);
  const { listId } = useParams();
  const deleteTaskClick = async (item) => {
    try {
      const deleteResult = await axios.delete(
        `http://localhost:8080/api/items/${listId}/${item}`
      );
      setItems((prevItems) => prevItems.filter((i) => i.item_id !== item));
    } catch (error) {
      console.error("Failed to delete item");
    }
  };
  return (
    <div className="list-card-container">
      <div className="list-card-body">
        <div className="list-card-check">
          <input type="checkbox"></input>
        </div>
        <div className="list-card-details">
          <h4>{name}</h4>
          <p>Quantity: {quantity}</p>
          <p>Department: {department}</p>
          <p>Store: {store}</p>
        </div>
      </div>
      <footer className="list-card-footer">
        <div className="list-card-btn-container">
          <button
            className="btn delete-btn"
            onClick={() => deleteTaskClick(itemId)}>
            Delete
          </button>
          <button className="btn edit-btn">Edit</button>
        </div>
      </footer>
    </div>
  );
};

export default ListItem;
