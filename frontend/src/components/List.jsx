import React from "react";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import ListItem from "./ListItem.Jsx";
import "../styles/List.css";
import { useNavigate, useParams } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setitemQuantity] = useState("");
  const [itemStore, setItemStore] = useState("");
  const [itemDepartment, setItemDepartment] = useState("");
  const [listName, setListName] = useState("");
  const { listId } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      console.log("listId is:", listId);
      try {
        const result = await axios.get(
          `http://localhost:8080/api/items/${listId}`,
          {
            withCredentials: true,
          }
        );
        setItems(result.data.item);
        setListName(result.data.listName);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login", {
            state: {
              from: "list",
              message: "Not logged in. Please log in",
            },
          });
        } else {
          console.error("Failed to fetch items: ", error);
        }
      }
    };
    fetchItems();
  }, []);

  const addItem = async () => {
    try {
      await axios.post(`http://localhost:8080/api/items/${listId}`, {
        name: itemName,
        quantity: itemQuantity,
        store_id: itemStore,
        department_id: itemDepartment,
      });

      const result = await axios.get(
        `http://localhost:8080/api/items/${listId}`
      );
      setItems(result.data.item);
      setItemName("");
      setitemQuantity("");
      setItemStore("");
      setItemDepartment("");
    } catch (error) {
      console.error("Failed to add item");
    }
  };

  const captureName = (e) => {
    setItemName(e.target.value);
  };

  const captureQuantity = (e) => {
    setitemQuantity(e.target.value);
  };

  const captureStore = (e) => {
    setItemStore(e.target.value);
  };

  const captureDepartment = (e) => {
    setItemDepartment(e.target.value);
  };

  return (
    <div className="list-container">
      <h2>{listName}</h2>
      <p>This will be a search bar eventually?</p>
      <p>Household: Personal</p>
      <label>Name</label>
      <input type="text" onChange={captureName} value={itemName}></input>
      <label>Quantity</label>
      <input
        type="number"
        onChange={captureQuantity}
        value={itemQuantity}></input>
      <label>Department</label>
      <select
        name="department"
        onChange={captureDepartment}
        value={itemDepartment}>
        <option value="">--Select a Department</option>
        <option value="1">Produce</option>
        <option value="2">Dairy</option>
        <option value="3">Bakery</option>
        <option value="4">Meat</option>
        <option value="5">Frozen Foods</option>
      </select>

      <label>Store</label>
      <select name="store" onChange={captureStore} value={itemStore}>
        <option value="">--Select a Store --</option>
        <option value="1">Costco</option>
        <option value="2">SuperStore</option>
        <option value="3">Lucky</option>
      </select>

      <button onClick={addItem}>Add</button>
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
