import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { UserDataProvider } from "./Context/UserDataProvider/UserDataProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={extendTheme({ direction: "rtl" })}>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
