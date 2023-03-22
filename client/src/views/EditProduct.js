import { useParams } from "react-router-dom"

export const EditProduct = (props) => {
    const { id } = useParams();
    
    return <h2>Edit Product</h2>
}