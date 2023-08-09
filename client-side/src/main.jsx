import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CartProvider from "./context/CartProvider";
import UserProvider from "./context/UserProvider";
import { ServiceProvider } from "./context/ServicesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ServiceProvider>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <ToastContainer />
          <App />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </ServiceProvider>
);
