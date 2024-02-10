// App.js
import React, { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  BrowserRouter,
  createBrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import ProductDisplay from "./pages/productDisplay/ProductDisplay";
import { fetchProducts } from "./redux/slice/productSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Cart from "./pages/cart/Cart";
import { render } from "@testing-library/react";
import TriggerContext from "./Context";

function App() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.product);
  const [reRender, setReRender] = useState(true);
  const triggerRender = () => {
    setReRender((prevState) => !prevState);
    console.log("running render", reRender);
  };
  console.log("running app");
  React.useEffect(() => {
    console.log(reRender);

    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <TriggerContext.Provider value={{ triggerRender }}>
        <BrowserRouter>
          <ToastContainer />
          <Header reRender={reRender} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="product" element={<ProductDisplay />}>
              <Route path=":productId" element={<ProductDisplay />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TriggerContext.Provider>
    </div>
  );
}

export default App;
