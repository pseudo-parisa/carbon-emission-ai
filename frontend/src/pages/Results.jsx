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
                        <div className="ai-header">
                            <div className="ai-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 16 16">
                                <path d="M0 0h16v16H0z" fill="none" />
                                <path fill="#fff" d="M12 9H4c-.827 0-1.5.673-1.5 1.5v.5c0 .123.062 3 5.5 3s5.5-2.877 5.5-3v-.5c0-.827-.673-1.5-1.5-1.5m.5 1.991C12.497 11.073 12.372 13 8 13s-4.497-1.927-4.5-2v-.5A.5.5 0 0 1 4 10h8a.5.5 0 0 1 .5.5zM5.5 8h5c.827 0 1.5-.673 1.5-1.5v-3c0-.827-.673-1.5-1.5-1.5h-2v-.5a.5.5 0 0 0-1 0V2h-2C4.673 2 4 2.673 4 3.5v3C4 7.327 4.673 8 5.5 8M5 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5zM5.75 5a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0m3 0a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0" />
                            </svg>
                            </div>

                            <div>
                                <h2>AI Sustainability Recommendations</h2>
                                <p>Personalized suggestions based on your emissions</p>
                            </div>
                        </div>

                        {aiLoading && (
                            <div className="ai-loading">
                                <div className="ai-loading-dot"></div>
                                <p>Analyzing your carbon footprint...</p>
                            </div>
                        )}

                        {aiError && (
                            <div className="ai-error">
                                <p>{aiError}</p>
                            </div>
                        )}

                        {!aiLoading && !aiError && recommendations && (
                            <div className="ai-response">
                                {recommendations}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}