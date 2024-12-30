import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderList from "./components/OrdersList.js";
import EditOrders from "./components/EditOrders.js";
import CreateOrder from "./components/CreateOrders.js";
import "./style/style.css";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<OrderList/>} />           
                <Route path="/create" element={<CreateOrder />} />   
                <Route path="/edit/:orderId" element={<EditOrders />} /> 
            </Routes>
        </Router>
    );
}

export default App;
