import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@emotion/react";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./store";
import theme from "theme";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
