import React from "react";
import ReactDOM from "react-dom";
import AOS from "aos";

import App from "./views/App.js";
import "./styles/global.scss";
import "./styles/responsive.scss";
import "./assets/font/fontawesome-free-5.15.3-web/css/all.min.css";
import "aos/dist/aos.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/index.js";
AOS.init({
  duration: 1000,
});

const store = configureStore({
  reducer: reducers,
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
