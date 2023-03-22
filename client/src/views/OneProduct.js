import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

export const OneProduct = (props) => {
    const { id } = useParams();

    const [product, setProduct] = useState(null)

    useEffect(() =>{
        axios
        .get(`http://localhost:8080/api/products/${id}`)
        .then((res) => {
            setProduct(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }, [id]);

    const { _id, title, price, description } = product;

    return (
        <div className="w-75 p-4 mx-auto">
            <div className="shadow mb-4 rounded border p-4 text-center">
                <h2>{title}</h2>
                <h5>Price: ${price}</h5>
                <p>Description: {description}</p>
            </div>
    </div>
    )
}