import React from "react"
import ReactDOM from "react-dom/client"
import "./style.css"
import { OverlayApp } from "./overlay"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OverlayApp />
  </React.StrictMode>
)
