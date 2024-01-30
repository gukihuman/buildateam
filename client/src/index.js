import React from "react"
import ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "react-query"
import "./index.css"
import App from "./App.jsx"
import { store } from "./redux/store.js"

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
