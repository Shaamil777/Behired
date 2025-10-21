import AppRoutes from "./routes/AppRoutes"
import {Toaster} from "react-hot-toast"
import { BrowserRouter } from "react-router-dom"
import './App.css'

function App() {
 return (
    <>
    <BrowserRouter>
 <AppRoutes/>
   <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "15px",
          },
        }}
        />
        </BrowserRouter>
    </>
 )
}

export default App
