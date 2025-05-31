import React from "react";
import "../styles/ListItem.css";

const ListItem = ({ name, quantity, department, store }) => {
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
      <footer>
        <div className="list-card-btn-container">
          <button>Delete</button>
          <button>Edit</button>
        </div>
      </footer>
    </div>
  );
};

export default ListItem;
