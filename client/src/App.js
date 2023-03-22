import { Link, Route, Routes } from 'react-router-dom';
import { AllProducts } from './views/AllProducts';
import { OneProduct } from './views/OneProduct';
import { EditProduct } from './views/EditProduct';


import './App.css';





function App() {
  return (
    <div className="container">
      







      <Routes>
        <Route path="/" element={<AllProducts/>}/>
        <Route path="/product/:id" element={<OneProduct/>}/>
        <Route path="/product/:id/edit" element={<EditProduct/>}/>
      </Routes>
    </div>
  );
}

export default App;
