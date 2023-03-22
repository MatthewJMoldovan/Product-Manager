import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const AllProducts = (props) => {

    const [products, setProducts] = useState([])

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [errors, setErrors] = useState(null);

    const navigate = useNavigate()


    useEffect(() =>{
        axios
        .get('http://localhost:8080/api/products')
        .then((res) => {
            setProducts(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error)
            setErrors(error);
        })
    }, []);


    const handleNewProductSubmit = (event) => {
        event.preventDefault();
        const newProduct = {
            title,
            price,
            description
        };

        axios.post('http://localhost:8080/api/products', newProduct)
        .then((res) => {
            console.log(res.data);
            const updatedProducts = [...products, newProduct];
            setProducts(updatedProducts)
        })
        .catch((error) => {
            console.log(error)
        })
        setTitle('')
        setPrice('')
        setDescription('')
    }


    return (
    <div>
        <div className="w-50 p-4 rounded mx-auto shadow mt-4">
            <h3 className="text-center">Add a product</h3>
            <form onSubmit={(event) =>{
                handleNewProductSubmit(event)
            }}>
                <div className="formGroup">
                    <label className="">Title</label>
                    <input onChange={(event) => {
                        setTitle(event.target.value)
                    }} type="text"
                    className="form-control" />
                </div>
                <div className="formGroup">
                    <label className="">Price</label>
                    <input onChange={(event) => {
                        setPrice(event.target.value)
                    }} type="text"
                    className="form-control" />
                </div>
                <div className="formGroup">
                    <label className="">Description</label>
                    <input onChange={(event) => {
                        setDescription(event.target.value)
                    }} type="text"
                    className="form-control" />
                </div>
            <button className="mt-2">Submit</button>
            </form>
            </div>
            <div className="w-75 p-4 mx-auto">
                {products.map((product, i) =>{
                    const { _id, title, price, description } = product;

                    return (
                        <div className="shadow mb-4 rounded border p-4 text-center" key={i}>
                            <h2><Link to={`/product/${_id}`}>{title}</Link></h2>
                            <h5>Price: ${price}</h5>
                            <p>Description: {description}</p>
                        </div>
                    )
                })}
            </div>
        
    </div>
    )
}

