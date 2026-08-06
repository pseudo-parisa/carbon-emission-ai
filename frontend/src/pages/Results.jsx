import { useLocation } from "react-router-dom";

export default function Results() {
    const location = useLocation();
    const { result } = location.state;

    return (
        <>
            { !result ? (
                <p>No results available.</p>
            ) : (
                <div>
                    <h1>Your Carbon Footprint</h1>
                    <p>Total: {result.total}</p>
                    <p>Transport: {result.transport}</p>
                    <p>Electricity: {result .electricity}</p>
                    <p>Flights: {result.flights}</p>
                    <p>Diet: {result.diet}</p>
                    <p>Shopping: {result.shopping}</p>
                </div>
            )}
        </>
    );
}