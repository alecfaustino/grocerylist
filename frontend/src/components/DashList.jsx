import axios from "axios";
import React from "react";
import "../styles/DashList.css";
import { useState } from "react";

const DashList = ({
  listId,
  householdId,
  name,
  handleListClick,
  userId,
  setLists,
}) => {
  const [listNameEditing, setListNameEditing] = useState(false);
  const [currName, setCurrName] = useState(name);
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:8080/api/lists/${id}`);
      setLists((prevLists) => prevLists.filter((l) => l.list_id !== id));
    } catch (error) {
      console.error("Failed to delete list");
    }
  };

  const captureInput = (e) => {
    setCurrName(e.target.value);
  };

  const toggleEdit = (e) => {
    e.stopPropagation();
    setListNameEditing(!listNameEditing);
  };

  const handleSave = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.patch(`http://localhost:8080/api/lists/${id}`, {
        name: currName,
      });

      setListNameEditing(false);
    } catch (error) {}
  };
  return (
    <div className="dash-list-card" onClick={() => handleListClick(listId)}>
      {!listNameEditing && <p>{currName}</p>}
      {listNameEditing && (
        <input
          value={currName}
          onChange={captureInput}
          onClick={(e) => e.stopPropagation()}></input>
      )}

      {!listNameEditing && <button onClick={(e) => toggleEdit(e)}>Edit</button>}
      {listNameEditing && (
        <button onClick={(e) => handleSave(e, listId)}>Save</button>
      )}
      <button onClick={(e) => handleDelete(e, listId)}>Delete</button>
    </div>
  );
};

export default DashList;
