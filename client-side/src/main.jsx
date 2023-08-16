import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {Provider} from  "react-redux";
import store from "./store/store";

import UserProvider from "./store/UserProvider";
import { ServiceProvider } from "./store/ServicesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    <ServiceProvider>
      <UserProvider>

      <Provider store={store}>
          <ToastContainer />
          <App />
      </Provider>

      </UserProvider>
    </ServiceProvider>

  </BrowserRouter>
);
