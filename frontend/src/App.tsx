import AppRoutes from "./routes/AppRoutes"
import {Toaster} from "react-hot-toast"
import './App.css'

function App() {
 return (
    <>
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
    </>
 )
}

export default App
