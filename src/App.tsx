import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

const App = () => {
  return (
    <div className="bg-gray-200 w-full min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Cart />
    </div>
  );
};

export default App;
