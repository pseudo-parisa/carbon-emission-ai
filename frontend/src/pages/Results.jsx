import { useLocation } from "react-router-dom";
import "../App.css";

export default function Results() {
    const location = useLocation();
    const { result } = location.state;

    return (
        <>
            { !result ? (
                <p>No results available.</p>
            ) : (
                <div className="results-container">
                    <div className="results-box">
                    <p>Transport: {result.transport}</p>
                    <p>Electricity: {result .electricity}</p>
                    <p>Flights: {result.flights}</p>
                    <p>Diet: {result.diet}</p>
                    <p>Shopping: {result.shopping}</p>
                    </div>
                    <h2>Total Carbon Footprint</h2>
                    <p className="total">{result.total} kg CO₂</p>
                </div>
            )}
        </>
    );
}