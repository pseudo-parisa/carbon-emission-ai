import { useEffect, useState } from "react";
import { getCalculations } from "../services/api";

function History() {
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return <p>Loading calculation history...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Calculation History</h1>

      {calculations.length === 0 ? (
        <p>No calculations saved yet.</p>
      ) : (
        calculations.map((calculation) => (
          <div key={calculation.id}>
            <h2> {new Date(calculation.created_at).toLocaleDateString()} </h2>

            <p> Total: {calculation.total.toFixed(2)} kg CO₂ </p>
            <p> Transport: {calculation.transport.toFixed(2)} kg </p>
            <p> Electricity: {calculation.electricity.toFixed(2)} kg </p>
            <p> Flights: {calculation.flights.toFixed(2)} kg </p>
            <p> Diet: {calculation.diet.toFixed(2)} kg </p>
            <p> Shopping: {calculation.shopping.toFixed(2)} kg </p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;