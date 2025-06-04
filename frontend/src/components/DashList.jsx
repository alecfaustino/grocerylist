import axios from "axios";
import React from "react";

const DashList = ({
  listId,
  householdId,
  name,
  handleListClick,
  userId,
  setLists,
}) => {
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:8080/api/lists/${userId}/${id}`);
      setLists((prevLists) => prevLists.filter((l) => l.list_id !== id));
    } catch (error) {
      console.error("Failed to delete list");
    }
  };
  return (
    <div onClick={() => handleListClick(listId)}>
      <p>{name}</p>
      <p>id: {listId}</p>
      <button>Edit</button>
      <button onClick={(e) => handleDelete(e, listId)}>Delete</button>
    </div>
  );
};

export default DashList;
