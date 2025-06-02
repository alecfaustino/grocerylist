import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DashList from "../components/DashList";

const Dashboard = () => {
  const { userId } = useParams();
  const [lists, setLists] = useState([]);
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

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>My Lists</h2>
      {lists.map((list) => (
        <DashList
          key={list.list_id}
          listId={list.list_id}
          household_id={list.household_id}
          name={list.name}
        />
      ))}
    </div>
  );
};

export default Dashboard;
