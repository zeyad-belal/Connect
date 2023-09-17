import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {Provider} from  "react-redux";
import store from "./store/store";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <Provider store={store}>
          <ToastContainer />
          <App />
      </Provider>
  </BrowserRouter>
);
