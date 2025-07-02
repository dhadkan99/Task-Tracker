import "./App.css";

import Landingpage from "./components/Landingpage";
import Dashboard from "./pages/Dashboard"; 
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="flex flex-col min-h-screen">
     
      

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
         
        </Routes>
      </main>
     
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
