import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { userId } = useParams();
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const listresult = await axios.get(
          `http://localhost:8080/api/lists/${userId}`
        );
        console.log(listresult.data);
      } catch (error) {}
    };

    fetchLists();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>My Lists</h2>
      {lists.map((list) => {})}
    </div>
  );
};

export default Dashboard;
