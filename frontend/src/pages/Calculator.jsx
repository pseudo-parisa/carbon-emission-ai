import api from "../services/api";
import { useState } from "react";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

export default function Calculator() {
    const [carDistance, setCarDistance] = useState("");
    const [electricityUsage, setElectricityUsage] = useState("");
    const [flightsPerYear, setFlightsPerYear] = useState("");
    const [dietaryHabits, setDietaryHabits] = useState("mixed");
    const [shoppingHabits, setShoppingHabits] = useState("medium");

   async function handleSubmit(event){
    event.preventDefault();

    const response = await api.post("/calculate", {
        carDistance: carDistance,
        electricityUsage: electricityUsage,
        flightsPerYear: flightsPerYear,
        dietaryHabits: dietaryHabits,
        shoppingHabits: shoppingHabits,
    });

    console.log(response.data);
    }

    return (
        <div>
            <h1>Carbon Footprint Calculator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <FormInput
                        label="Car Distance (km/year)"
                        type="number"
                        value={carDistance}
                        onChange={(e) => setCarDistance(Number(e.target.value))}
                    />
                </div>
                <div>
                    <FormInput
                        label="Monthly Electricity (kWh)"
                        type="number"
                        value={electricityUsage}
                        onChange={(e) => setElectricityUsage(Number(e.target.value))}
                    />
                </div>
                <div>
                    <FormInput
                        label="Flights Per Year"
                        type="number"
                        value={flightsPerYear}
                        onChange={(e) => setFlightsPerYear(Number(e.target.value))}
                    />
                </div>
                {/* Dietary Habits */}
                <div>
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
                <div>
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
                <button type="submit">Calculate</button>
            </form>
        </div>
    );
}



