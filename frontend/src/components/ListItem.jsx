import React from "react";
import "../styles/ListItem.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ListItem.css";
import "../styles/List.css";
import { useState } from "react";

const ListItem = ({ name, quantity, department, store, itemId, setItems }) => {
  const [currName, setCurrName] = useState(name);
  const [currQuantity, setCurrQuantity] = useState(quantity);
  const [currDepartment, setCurrDepartment] = useState(department);
  const [currStore, setCurrStore] = useState(store);
  const [cardEdit, setCardEdit] = useState(false);
  const [savedName, setSavedName] = useState(name);
  const [savedQuantity, setSavedQuantity] = useState(quantity);
  const [savedDepartment, setSavedDepartment] = useState(department);
  const [savedStore, setSavedStore] = useState(store);
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

  const toggleEdit = () => {
    setCardEdit(!cardEdit);
  };

  const handleSave = async (item) => {
    try {
      await axios.patch(`http://localhost:8080/api/items/${listId}/${item}`, {
        name: currName,
        quantity: currQuantity,
        // implement this in the future
        photo_url: null,
        department_id: currDepartment,
        store_name: currStore,
      });

      setCardEdit(false);
      setSavedName(currName);
      setSavedQuantity(currQuantity);
      setSavedDepartment(currDepartment);
      setSavedStore(currStore);
    } catch (error) {
      console.error("Failed to update item");
    }
  };
  return (
    <div className="list-card-container">
      <div className="list-card-body">
        <div className="list-card-check">
          <input type="checkbox"></input>
        </div>
        <div className="list-card-details">
          {!cardEdit && (
            <>
              <h4>{savedName}</h4>
              <p>Quantity: {savedQuantity}</p>
              <p>Department: {savedDepartment}</p>
              <p>Store: {savedStore}</p>
            </>
          )}

          {cardEdit && (
            <div className="item-edit-container">
              <label>Name</label>
              <input
                className="form-input"
                type="text"
                onChange={(e) => {
                  setCurrName(e.target.value);
                }}
                value={currName}
              />

              <label>Quantity</label>
              <input
                className="form-input"
                type="number"
                onChange={(e) => {
                  setCurrQuantity(e.target.value);
                }}
                value={currQuantity}
              />

              <label>Department</label>
              <select
                className="form-select"
                onChange={(e) => {
                  setCurrDepartment(e.target.value);
                }}
                value={currDepartment}>
                <option value="">--Select a Department</option>
                <option value="1">Produce</option>
                <option value="2">Dairy</option>
                <option value="3">Bakery</option>
                <option value="4">Meat</option>
                <option value="5">Frozen Foods</option>
              </select>

              <label>Store</label>
              <input
                list="store-options"
                className="form-input"
                value={currStore}
                onChange={(e) => {
                  setCurrStore(e.target.value);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <footer className="list-card-footer">
        <div className="list-card-btn-container">
          {!cardEdit && (
            <button
              className="btn delete-btn"
              onClick={() => deleteTaskClick(itemId)}>
              Delete
            </button>
          )}

          {cardEdit && (
            <button
              className="btn delete-btn"
              onClick={() => setCardEdit(false)}>
              Cancel
            </button>
          )}
          {!cardEdit && (
            <button className="btn edit-btn" onClick={toggleEdit}>
              Edit
            </button>
          )}
          {cardEdit && (
            <button className="btn edit-btn" onClick={() => handleSave(itemId)}>
              Save
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default ListItem;
