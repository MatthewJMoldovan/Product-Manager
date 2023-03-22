import { Link, Route, Routes } from 'react-router-dom';
import { AllProducts } from './views/AllProducts';
import { OneProduct } from './views/OneProduct';
import { EditProduct } from './views/EditProduct';


import './App.css';





function App() {
  return (
    <div className="container">
      <nav className='navbar navbar-expand-lg navbar-light bg-light sticky-top justify-content-center mb-4'>
      <h1 className="navbar-brand mb-0">Product Manager</h1>
      <div className='navbar-nav'>
        <Link to="/" className='btn btn-primary mx-1'>Home</Link>
      </div>
      </nav>







      <Routes>
        <Route path="/" element={<AllProducts/>}/>
        <Route path="/product/:id" element={<OneProduct/>}/>
        <Route path="/product/:id/edit" element={<EditProduct/>}/>
      </Routes>
    </div>
  );
}

export default App;
