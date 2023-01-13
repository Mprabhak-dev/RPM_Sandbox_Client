import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ParticipantContextProvider } from "./context/participantContext/ParticipantContext";
import { SessionContextProvider } from "./context/sessionContext/SessionContext";

// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
// } from "react-router-dom";

//https://reactrouter.com/en/main/start/overview
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Dashboard />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );

// ReactDOM.render(
//   <React.StrictMode>
//     <ParticipantContextProvider>
//       <App />
//     </ParticipantContextProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ParticipantContextProvider>
      <SessionContextProvider>
        <App />
      </SessionContextProvider>
    </ParticipantContextProvider>
  </React.StrictMode>
);
