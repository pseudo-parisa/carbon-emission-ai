import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Results from "./pages/Results";
import Navbar from "./components/Navbar";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/results" element={<Results />} />
                <Route path="/history" element={<History />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;