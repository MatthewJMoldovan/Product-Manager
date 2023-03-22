import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const OneProduct = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleDeleteClick = () => {
    axios
      .delete(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (product === null) {
    return <h1>Loading...Pleast Wait!</h1>;
  }

  const { _id, title, price, description } = product;

  return (
    <div className="w-75 p-4 mx-auto">
      <div className="shadow mb-4 rounded border p-4 text-center">
        <h2>{title}</h2>
        <h5>Price: ${price}</h5>
        <p>Description: {description}</p>
      </div>
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
          to={`/product/${id}/edit`}
          className="btn btn-outline-warning mx-1"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};
