import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {Provider} from  "react-redux";
import store from "./store/store";
import ScrollToTop from "./ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <Provider store={store}>
        <ScrollToTop />
        <App />
      </Provider>
  </BrowserRouter>
);
