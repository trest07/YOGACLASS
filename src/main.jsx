import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "@unocss/reset/tailwind.css"
import "uno.css"

import App from "./App.jsx"
import { registerSW } from "virtual:pwa-register"
registerSW({ immediate: true })

function Loading() {
  return <div className="w-full py-10 text-center text-gray-500">Loading…</div>
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={<Loading />}>
        <App />
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>
)
