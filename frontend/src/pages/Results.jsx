import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import EmissionChart from "../components/EmissionChart";
import EmissionCard from "../components/EmissionCard";
import api from "../services/api";
import "../App.css";

export default function Results() {
    const location = useLocation();
    const result = location.state?.result;

    const [recommendations, setRecommendations] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState("");

useEffect(() => {
    if (!result) {
        return;
    }

    async function fetchRecommendations() {
        setAiLoading(true);
        setAiError("");

        try {
            const response = await api.post("/ai-recommendations", {
                transport: result.transport,
                electricity: result.electricity,
                flights: result.flights,
                diet: result.diet,
                shopping: result.shopping,
                total: result.total
            });

            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error("AI recommendation error:", error);
            setAiError("Unable to load AI recommendations right now.");
        } finally {
            setAiLoading(false);
        }
    }

    fetchRecommendations();
}, [result]);

    return (
        <>
            { !result ? (
                <p>No results available.</p>
            ) : (
                <div className="results-page page-enter">
                    <div className="emission-grid">
                        <EmissionCard icon="🚗" title="Transport" value={result.transport.toFixed(2)} />
                        <EmissionCard icon="💡" title="Electricity" value={result.electricity.toFixed(2)} />
                        <EmissionCard icon="✈️" title="Flights" value={result.flights.toFixed(2)} />
                        <EmissionCard icon="🥗" title="Diet" value={result.diet.toFixed(2)} />
                        <EmissionCard icon="🛍️" title="Shopping" value={result.shopping.toFixed(2)} />
                    </div>
                    <div className="total-section">
                        <p className="total-label">Your Annual Carbon Footprint</p>
                        <p className="total">{result.total.toFixed(2)}</p>
                        <p className="total-unit">kg CO₂ / year</p>
                    </div>

                    <p className="chart-description">
                        Here's how your estimated carbon footprint is divided across different areas.
                    </p>

                    <EmissionChart results={result} />
                    <div className="ai-recommendations">
                        <h2>🤖 AI Sustainability Recommendations</h2>

                        {aiLoading && (
                            <p>Analyzing your carbon footprint...</p>
                        )}

                        {aiError && (
                            <p className="error-message">
                                {aiError}
                            </p>
                        )}

                        {!aiLoading && !aiError && recommendations && (
                            <p className="ai-response">
                                {recommendations}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}