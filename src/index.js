import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Buffer } from "buffer";
import { clearTempPassword } from "./security/storage";

// Make Buffer globally available
window.Buffer = Buffer;

window.addEventListener("beforeunload", () => {
  clearTempPassword();
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
