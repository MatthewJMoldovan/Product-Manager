import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

export const EditProduct = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [validationErrors, setValidationErrors] = useState(null);

    useEffect(() => {
        axios
          .get(`http://localhost:8080/api/products/${id}`)
          .then((res) => {
            const { title, price, description } = res.data
            
            setTitle(title)
            setPrice(price)
            setDescription(description)
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [id]);

      const handleEditSubmit = (event) => {
        event.preventDefault();
        const editedProduct = {
          title,
          price,
          description,
        };
    
        axios
          .put(`http://localhost:8080/api/products/${id}`, editedProduct)
          .then((res) => {
            console.log(res.data);
            navigate(`/product/${id}`)
          })
          .catch((error) => {
            console.log(error);
            setValidationErrors(error?.response?.data?.errors);
          });
      };



    return(
        <div className="w-50 p-4 rounded mx-auto shadow mt-4">
        <h3 className="text-center">Edit Product</h3>
        <form
          onSubmit={(event) => {
            handleEditSubmit(event);
          }}
        >
          <div className="formGroup">
            <label className="">Title</label>
            {validationErrors?.title && <span className="text-danger ms-1">- {validationErrors.title.message}</span>}
            <input
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              type="text"
              className="form-control"
              value={title}
            />
          </div>
          <div className="formGroup">
            <label className="">Price</label>
            {validationErrors?.price && <span className="text-danger ms-1">- {validationErrors.price.message}</span>}
            <input
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              type="text"
              className="form-control"
              value={price}
            />
          </div>
          <div className="formGroup">
            <label className="">Description</label>
            {validationErrors?.description && <span className="text-danger ms-1">- {validationErrors.description.message}</span>}
            <input
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              type="text"
              className="form-control"
              value={description}
            />
          </div>
          <button className="btn btn-outline-primary mx-1 mt-2">Submit</button>
          <Link className="btn btn-success mx-1 mt-2" to={`/product/${id}`}>Back</Link>
        </form>
      </div>
    )
}