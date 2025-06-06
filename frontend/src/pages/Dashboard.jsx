import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DashList from "../components/DashList";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const listResult = await axios.get(`http://localhost:8080/api/lists/`, {
          withCredentials: true,
        });
        setLists(listResult.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login", {
            state: {
              from: "dashboard",
              message: "Not logged in. Please log in",
            },
          });
        } else {
          console.error("Failed to fetch items: ", error);
        }
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
      await axios.post(`http://localhost:8080/api/lists/`, {
        name: listName,
      });

      const result = await axios.get(`http://localhost:8080/api/lists/`);
      setLists(result.data.data);
      setListName("");
    } catch (error) {
      console.error("Failed to add new list");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <h2>My Lists</h2>
      <div className="add-list-container">
        <h3>Add a List</h3>
        <form onSubmit={addList} className="add-list-form">
          <label htmlFor="listName">List Name</label>
          <input
            id="listName"
            type="text"
            onChange={captureListName}
            value={listName}
            placeholder="e.g. Groceries"
          />
          <button type="submit">Add</button>
        </form>
      </div>
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
