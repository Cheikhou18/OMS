import React from "react";
import { useState,useEffect } from "react";
import { get, del } from "../services/api.js";
import { Link, useNavigate } from "react-router-dom";

function OrderList() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const orders = await get('orders'); 
            setOrders(orders);

            if(orders.length === 0) {
                navigate("/create");
            }

        }catch(error){
            console.error("Erreur lors de la récupération des commandes :", error)
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
            try {
                await del(`orders/${id}/del`);
                alert("Commande supprimée avec succès !"); 
                fetchOrders();
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);    
            }
        }
    };

    return (
        <div className="container">
            <h1>Liste des commandes</h1>
            <ul>
                {orders?.map(order => (
                    <li key={order.id}>
                        <Link to={`edit/${order.id}`}>
                        {order.orderNumber} - {order.status}
                        </Link>
                        <button onClick={() => handleDelete(order.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>

            <Link to="/create" className="floating-button">
                +
            </Link>
        </div>
    )
}

export default OrderList;