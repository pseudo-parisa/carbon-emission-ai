import React, { useState, useEffect } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

export default function EmissionChart({ results }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 700);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        outerRadius={90}
                        innerRadius={45}
                        label={!isMobile ? ({ name, value }) => `${name}: ${Number(value).toFixed(1)}` : false}
                        labelLine={!isMobile}
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

                    <Legend
                        verticalAlign="bottom"
                        height={36}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}