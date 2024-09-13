import './App.css';
import "./components/navbar.css";
import { Navbar } from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/home/home'; // Import the Home component
import { Arts } from './pages/arts/arts'; // Import the Arts component
import { Artists } from './pages/artists/artists'; // Import the Artists component
import Contact  from './pages/contact/contact'; // Import the Contact component
import Portfolio from './pages/artists/portfolio';
import { ArtsPortfolio } from './pages/arts/arts-portfolio'; // Import the ArtsPortfolio component
import Cart from './pages/cart/cart';
import { CartContextProvider } from "./context/CartContext";


function App() {
  return (
    <div className="App">
      <CartContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/arts" element={<Arts />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/portfolio/:artistId" element={<Portfolio />} />
            <Route path="/arts-portfolio/:artName" element={<ArtsPortfolio />} />
          </Routes>
        </Router>
      </CartContextProvider>
    </div>
  );
}

export default App;
