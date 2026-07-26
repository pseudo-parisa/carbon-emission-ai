import api from "../services/api";
import { useState } from "react";

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
                <label>Car Distance (km/year)</label>
                    <input type="number" value={carDistance} onChange={(e) => setCarDistance(Number(e.target.value))}/>
                </div>
                <div>
                    <label>Monthly Electricity (kWh)</label>
                    <input type="number" value={electricityUsage} onChange={(e) => setElectricityUsage(Number(e.target.value))}/>
                </div>
                <div>
                    <label>Flights Per Year</label>
                    <input type="number" value={flightsPerYear} onChange={(e) => setFlightsPerYear(Number(e.target.value))}/>
                </div>
                {/* Dietary Habits */}
                <div>
                    <label>Dietary Habits</label>
                    <select value={dietaryHabits} onChange={(e) => setDietaryHabits(e.target.value)}>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="mixed">Mixed</option>
                        <option value="heavyMeat">Heavy Meat</option>
                    </select>
                </div>
                {/* Shopping Habits */}
                <div>
                    <label>Shopping Habits</label>
                    <select value={shoppingHabits} onChange={(e) => setShoppingHabits(e.target.value)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button type="submit">Calculate</button>
            </form>
        </div>
    );
}



