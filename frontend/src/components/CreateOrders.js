import React, { useState } from "react";
import { post } from "../services/api";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function CreateOrder() {
    const [formData, setFormData] = useState({
        orderNumber: uuidv4(),
        status: "En cours",
        products: [],  
        client: "",
    });

    const navigate = useNavigate();

    const [productInput, setProductInput] = useState("");

    const handleAddProduct = () => {
        if (productInput.trim()) {
          
            setFormData({ 
                ...formData, 
                products: [...formData.products, productInput] 
            });
            setProductInput("");  
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.client || formData.products.length === 0) {
            alert("Veuillez renseigner un client et au moins un produit.");
            return;
        }

        try {
            await post("orders/new", formData);
            alert("Commande créée avec succès !");
            setFormData({
                orderNumber: uuidv4(),
                status: "En cours",
                products: [],
                client: "",
            });
        } catch (error) {
            console.error("Erreur lors de la création de la commande :", error);
        }
    };

    return (
        <div className="container">
            <h1>Créer une nouvelle commande</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Produit</label>
                    <input
                        type="text"
                        name="product"
                        value={productInput}
                        onChange={(e) => setProductInput(e.target.value)}
                        placeholder="Nom du Produit"
                    />
                    <button type="button" onClick={handleAddProduct}>
                        Ajouter produit
                    </button>
                </div>
                <ul>
                    {formData.products.map((product, index) => (
                        <li key={index}>{product}</li>
                    ))}
                </ul>

                <div>
                    <label>Client</label>
                    <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Créer</button>
            </form>
            <div><Link to={"/"} className="Liste">Liste des commandes</Link></div>
        </div>
    );
}

export default CreateOrder;
