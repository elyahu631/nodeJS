
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Store from './pages/store';
import Product from './pages/product';


function App() {

  return (
    <div>
      <BrowserRouter>
        <header style={{display:"flex", justifyContent:"space-between",height:"45vh",width:"100vh"}}>
          <Link to="/">Home</Link>
          <span>&nbsp;</span>
          <Link to="/store">Store</Link>
          <span>&nbsp;</span>
          <Link to="/product">Product</Link>
        </header>

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/store' element={<Store />} />
            <Route path='/product' element={<Product/>} />

          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
