import { useLocation } from "react-router-dom";
import EmissionChart from "../components/EmissionChart";
import EmissionCard from "../components/EmissionCard";
import "../App.css";

export default function Results() {
    const location = useLocation();
    const result = location.state?.result;

    return (
        <>
            { !result ? (
                <p>No results available.</p>
            ) : (
                <div className="results-container">
                    <div className="emission-grid">
                        <EmissionCard icon="🚗" title="Transport" value={result.transport} />
                        <EmissionCard icon="💡" title="Electricity" value={result.electricity} />
                        <EmissionCard icon="✈️" title="Flights" value={result.flights} />
                        <EmissionCard icon="🥗" title="Diet" value={result.diet} />
                        <EmissionCard icon="🛍️" title="Shopping" value={result.shopping} />
                    </div>
                    <div className="total-section">
                        <p className="total-label">Your Annual Carbon Footprint</p>
                        <p className="total">{result.total}</p>
                        <p className="total-unit">kg CO₂ / year</p>
                    </div>
                    <h2>Where Your Emissions Come From</h2>

                    <p className="chart-description">
                        Here's how your estimated carbon footprint is divided across different areas.
                    </p>

                    <EmissionChart results={result} />
                </div>
                
            )}
        </>
    );
}