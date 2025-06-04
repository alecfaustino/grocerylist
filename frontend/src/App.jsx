import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import List from "./components/List";
function App() {
  // ADD A INDEX ROUTE
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="/dashboard/" element={<Dashboard />}></Route>
        <Route path="/list/:listId" element={<List />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
