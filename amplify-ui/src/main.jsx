import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import "@cloudscape-design/global-styles/index.css";

import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AmplifyProvider>
      <App />
    </AmplifyProvider>
  </React.StrictMode>
);
