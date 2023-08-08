import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CartProvider from "./context/CartProvider";
import UserProvider from "./context/UserProvider";
import { ProductProvider } from "./context/ProductsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <ToastContainer />
          <App />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </ProductProvider>
);
