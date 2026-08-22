import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Results from "./pages/Results";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/results" element={<Results />} />
            </Routes>
        </div>
    );
}

export default App;