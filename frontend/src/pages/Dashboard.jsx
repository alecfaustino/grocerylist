import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DashList from "../components/DashList";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState("");
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const listResult = await axios.get(
          `http://localhost:8080/api/lists/${userId}`
        );
        setLists(listResult.data.data);
      } catch (error) {
        console.error("failed to fetch lists: ", error);
      }
    };

    fetchLists();
  }, [userId]);

  const handleListClick = (listId) => {
    navigate(`/list/${listId}`);
  };

  const captureListName = (e) => {
    setListName(e.target.value);
  };

  const addList = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/lists/${userId}`, {
        name: listName,
      });

      const result = await axios.get(
        `http://localhost:8080/api/lists/${userId}`
      );
      setLists(result.data.data);
      setListName("");
    } catch (error) {
      console.error("Failed to add new list");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>My Lists</h2>
      <h3>Add a List!</h3>
      <label>ListName</label>
      <input type="text" onChange={captureListName} value={listName}></input>
      <button onClick={(e) => addList(e)}>Add</button>
      {lists.map((list) => (
        <DashList
          key={list.list_id}
          listId={list.list_id}
          householdId={list.household_id}
          name={list.name}
          userId={userId}
          handleListClick={handleListClick}
          setLists={setLists}
        />
      ))}
    </div>
  );
};

export default Dashboard;
