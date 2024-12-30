import React from "react";
import {get, patch} from "../services/api.js";
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";

function EditOrders() {
    
    const { orderId } = useParams();

    const [formData, setFormData] = useState({
        orderNumber:"",
        status:"",
        product:"",
        client:"",
    });

    useEffect(() => {
        async function fetchData() {
           try {
            const data = await get(`orders/${orderId}`)
            setFormData(data)
        }catch(error) {
            console.error("Erreur lors de la récupération des commandes :", error)
        }
        } fetchData();
    },[orderId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await patch(`orders/${orderId}/edit`, formData);  
            alert("Commande mise à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la commande :", error);
        }
    };

    return (
        <div>
            <h1>Éditer la commande {orderId}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Numéro de commande</label>
                    <input
                        type="text"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Status</label>
                    <input
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Produit</label>
                    <input
                        type="text"
                        name="product"
                        value={formData.product}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Client</label>
                    <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
}

export default EditOrders;

