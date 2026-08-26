import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import "../App.css";

export default function Calculator() {
    const [carDistance, setCarDistance] = useState("");
    const navigate = useNavigate();
    const [electricityUsage, setElectricityUsage] = useState("");
    const [flightsPerYear, setFlightsPerYear] = useState("");
    const [dietaryHabits, setDietaryHabits] = useState("mixed");
    const [shoppingHabits, setShoppingHabits] = useState("medium");

    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (carDistance === "" || electricityUsage === "" || flightsPerYear === "") {
            setError("Please complete all required fields.");
            return;
        }

        if (carDistance < 0 || carDistance > 200000) {
            setError("Please enter a valid annual car distance.");
            return;
        }

        if (electricityUsage < 0 || electricityUsage > 10000) {
            setError("Please enter a valid monthly electricity usage.");
            return;
        }

        if (flightsPerYear < 0 || flightsPerYear > 365) {
            setError("Please enter a valid number of flights.");
            return;
        }

        try {
            const response = await api.post("/calculate", {
                carDistance: carDistance,
                electricityUsage: electricityUsage,
                flightsPerYear: flightsPerYear,
                dietaryHabits: dietaryHabits,
                shoppingHabits: shoppingHabits,
            });

            navigate("/results", { state: { result: response.data } });

        } catch (error) {
            setError(
                "Unable to connect to the calculation server. Please make sure the backend is running and try again."
            );
        }
    }

    return (
        <div className="calculator-container">
            <h1>Carbon Footprint Calculator</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <FormInput
                        label="Car Distance (km/year)"
                        type="number"
                        value={carDistance}
                        onChange={(e) => setCarDistance(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        label="Monthly Electricity (kWh)"
                        type="number"
                        value={electricityUsage}
                        onChange={(e) => setElectricityUsage(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <FormInput
                        label="Flights Per Year"
                        type="number"
                        value={flightsPerYear}
                        onChange={(e) => setFlightsPerYear(e.target.value)}
                    />
                </div>
                {/* Dietary Habits */}
                <div className="form-group">
                    <FormSelect
                        label="Dietary Habits"
                        value={dietaryHabits}
                        onChange={(e) => setDietaryHabits(e.target.value)}
                        options={[
                            { value: "vegetarian", label: "Vegetarian" },
                            { value: "mixed", label: "Mixed" },
                            { value: "heavyMeat", label: "Heavy Meat" }
                        ]}
                    />
                </div>
                {/* Shopping Habits */}
                <div className="form-group">
                    <FormSelect
                        label="Shopping Habits"
                        value={shoppingHabits}
                        onChange={(e) => setShoppingHabits(e.target.value)}
                        options={[
                            { value: "low", label: "Low" },
                            { value: "medium", label: "Medium" },
                            { value: "high", label: "High" }
                        ]}
                    />
                </div>
                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <button type="submit">Calculate</button>
            </form>
        </div>
    );
}



