import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

export default function EmissionChart({ results }) {

    const data = [
        {
            name: "Transport",
            value: results.transport
        },
        {
            name: "Electricity",
            value: results.electricity
        },
        {
            name: "Flights",
            value: results.flights
        },
        {
            name: "Diet",
            value: results.diet
        },
        {
            name: "Shopping",
            value: results.shopping
        }
    ];

    return (
        <div className="chart-container">

            <h2>Emission Breakdown</h2>

            <ResponsiveContainer width="100%" height={350}>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={45}
                        label={({ name, value }) => `${name}: ${Number(value).toFixed(1)}`}
                    >

                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={[
                                    "#22c55e",
                                    "#16a34a",
                                    "#15803d",
                                    "#0f766e",
                                    "#84cc16"
                                ][index % 5]}
                            />
                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>
    );
}