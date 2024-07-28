import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Providers from "./components/providers.jsx";
import "./index.css";
import 'rsuite/dist/rsuite-no-reset.min.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
