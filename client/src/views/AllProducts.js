import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const AllProducts = (props) => {
  const [products, setProducts] = useState([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [validationErrors, setValidationErrors] = useState(null);
//This generates all products
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
// This is for the form
  const handleNewProductSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      title,
      price,
      description,
    };

    axios
      .post("http://localhost:8080/api/products", newProduct)
      .then((res) => {
        console.log(res.data);
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        setTitle("");
        setPrice("");
        setDescription("");
      })
      .catch((error) => {
        console.log(error);
        setValidationErrors(error?.response?.data?.errors);
      });
  };
//This deletes a product
  const handleDeleteClick = (idToDelete) => {
    axios
      .delete(`http://localhost:8080/api/products/${idToDelete}`)
      .then((res) => {
        const filteredProducts = products.filter((product) => {
          const isProductToDelete = idToDelete === product._id;

          if (isProductToDelete) {
            return false;
          }
          return true;
        });

        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="w-50 p-4 rounded mx-auto shadow mt-4">
        <h3 className="text-center">Add a product</h3>
        <form
          onSubmit={(event) => {
            handleNewProductSubmit(event);
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
            />
          </div>
          <button className="btn btn-outline-primary mx-1 mt-2">Submit</button>
        </form>
      </div>
      <div className="w-75 p-4 mx-auto">
        {products.map((product, i) => {
          const { _id, title, price, description } = product;

          return (
            <div className="shadow mb-4 rounded border p-4 text-center" key={i}>
              <h2>
                <Link to={`/product/${_id}`}>{title}</Link>
              </h2>
              <h5>Price: ${price}</h5>
              <p>Description: {description}</p>
              <div>
                <button
                  onClick={(event) => {
                    handleDeleteClick(_id);
                  }}
                  className="btn btn-outline-danger mx-1"
                >
                  Delete
                </button>
                <Link
                  to={`/product/${_id}/edit`}
                  className="btn btn-outline-warning mx-1"
                >
                  Edit
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
