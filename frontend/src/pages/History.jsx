import { useEffect, useState } from "react";
import { getCalculations } from "../services/api";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import "../App.css";


function History() {
    const [calculations, setCalculations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const progressData = calculations.map((calculation, index) => ({
        name: `#${index + 1}`,
        date: new Date(calculation.created_at).toLocaleDateString(),
        total: Number(calculation.total),
    }));


    useEffect(() => {
        const fetchCalculations = async () => {
            try {
                const data = await getCalculations();
                setCalculations(data);
            } catch (error) {
                console.error("Failed to fetch calculations:", error);
                setError("Unable to load calculation history.");
            } finally {
                setLoading(false);
            }
        };

        fetchCalculations();
    }, []);

    const calculationCount = calculations.length;

    const latestCalculation =
        calculations.length > 0 ? calculations[calculations.length - 1] : null;

    const firstCalculation =
        calculations.length > 0 ? calculations[0] : null;

    const overallChange =
        firstCalculation && latestCalculation ? latestCalculation.total - firstCalculation.total : null;

    const overallChangePercentage =
        firstCalculation && latestCalculation && firstCalculation.total !== 0 ? (overallChange / firstCalculation.total) * 100 : null;

    const averageTotal =
        calculations.length > 0
            ? calculations.reduce(
                  (sum, calculation) => sum + calculation.total,
                  0
              ) / calculations.length
            : 0;

    const previousCalculation =
    calculations.length > 1
        ? calculations[calculations.length - 2]
        : null;

    const carbonChange =
        latestCalculation && previousCalculation
            ? latestCalculation.total - previousCalculation.total
            : null;

    const carbonChangePercentage =
        latestCalculation && previousCalculation
            ? (carbonChange / previousCalculation.total) * 100
            : null;

    if (loading) {
        return (
            <main className="history-page">
                <p className="history-message">
                    Loading calculation history...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="history-page">
                <p className="history-message history-error">
                    {error}
                </p>
            </main>
        );
    }

    return (
        <main className="history-page">
            <div className="history-container">
                <div className="history-header">
                    <h1>Calculation History</h1>
                    <p>
                        Review your previous carbon footprint calculations.
                    </p>
                </div>

                {latestCalculation && previousCalculation && (
                    <div className="history-trend">
                        <div className="trend-header">
                            <h2>Your Carbon Trend</h2>
                        </div>

                        <div className="trend-content">
                            <div className="trend-value">
                                <span>Change</span>

                                <strong>
                                    {carbonChange > 0 ? "+" : ""}
                                    {carbonChange.toFixed(2)} kg CO₂
                                </strong>

                                <small>
                                    {carbonChangePercentage > 0 ? "+" : ""}
                                    {carbonChangePercentage.toFixed(2)}%
                                </small>
                            </div>

                            <div className="trend-comparison">
                                <div>
                                    <span>Previous</span>
                                    <strong>
                                        {previousCalculation.total.toFixed(2)} kg
                                    </strong>
                                </div>

                                <div>
                                    <span>Latest</span>
                                    <strong>
                                        {latestCalculation.total.toFixed(2)} kg
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            
                <div className="history-summary">
                    <div className="summary-card">
                        <span>Calculations</span>
                        <strong>{calculationCount}</strong>
                    </div>

                    <div className="summary-card">
                        <span>Latest Total</span>
                        <strong>
                            {latestCalculation
                                ? latestCalculation.total.toFixed(2)
                                : "0.00"}
                        </strong>
                        <small>kg CO₂</small>
                    </div>

                    <div className="summary-card">
                        <span>Average Total</span>
                        <strong>{averageTotal.toFixed(2)}</strong>
                        <small>kg CO₂</small>
                    </div>
                </div>

                {calculations.length >= 2 && (
                    <div className="history-progress">
                        <div className="progress-header">
                            <h2>Your Carbon Progress</h2>
                            <p>
                                Track how your carbon footprint has changed over time.
                            </p>
                        </div>
                        
                        <div className="progress-chart">
                            <ResponsiveContainer width="100%" height={320}>
                                <LineChart data={progressData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value) => [
                                            `${Number(value).toFixed(2)} kg CO₂`,
                                            "Carbon footprint",
                                        ]}
                                        labelFormatter={(label) => {
                                            const point = progressData.find(
                                                (item) => item.name === label
                                            );

                                            return point ? point.date : label;
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#4caf50" 
                                        strokeWidth={3}
                                        dot={{ r: 5 }}
                                        activeDot={{ r: 7 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="progress-summary">
                            <div>
                                <span>First calculation</span>
                                <strong>
                                    {firstCalculation.total.toFixed(2)} kg
                                </strong>
                            </div>

                            <div>
                                <span>Latest calculation</span>
                                <strong>
                                    {latestCalculation.total.toFixed(2)} kg
                                </strong>
                            </div>

                            <div>
                                <span>Overall change</span>
                                <strong>
                                    {overallChange > 0 ? "+" : ""}
                                    {overallChange.toFixed(2)} kg
                                </strong>

                                <small>
                                    {overallChangePercentage > 0 ? "+" : ""}
                                    {overallChangePercentage.toFixed(2)}%
                                </small>
                            </div>
                        </div>
                    </div>
                )}                

                {calculations.length === 0 ? (
                    <div className="history-empty">
                        <h2>No calculations yet</h2>
                        <p>
                            Complete a carbon footprint calculation to see it
                            appear here.
                        </p>
                    </div>
                ) : (
                    <div className="history-list">
                        {calculations.map((calculation) => (
                            <article
                                className="history-card"
                                key={calculation.id}
                            >
                                <div className="history-card-header">
                                    <div>
                                        <h2>
                                            {new Date(
                                                calculation.created_at
                                            ).toLocaleDateString()}
                                        </h2>
                                        <p>Carbon footprint calculation</p>
                                    </div>

                                    <div className="history-total">
                                        <span>Total</span>
                                        <strong>
                                            {calculation.total.toFixed(2)}
                                        </strong>
                                        <small>kg CO₂</small>
                                    </div>
                                </div>

                                <div className="history-breakdown">
                                    <div className="history-item">
                                        <span>Transport</span>
                                        <strong>
                                            {calculation.transport.toFixed(2)} kg
                                        </strong>
                                    </div>

                                    <div className="history-item">
                                        <span>Electricity</span>
                                        <strong>
                                            {calculation.electricity.toFixed(2)} kg
                                        </strong>
                                    </div>

                                    <div className="history-item">
                                        <span>Flights</span>
                                        <strong>
                                            {calculation.flights.toFixed(2)} kg
                                        </strong>
                                    </div>

                                    <div className="history-item">
                                        <span>Diet</span>
                                        <strong>
                                            {calculation.diet.toFixed(2)} kg
                                        </strong>
                                    </div>

                                    <div className="history-item">
                                        <span>Shopping</span>
                                        <strong>
                                            {calculation.shopping.toFixed(2)} kg
                                        </strong>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
                
            </div>
        </main>
    );
}

export default History;