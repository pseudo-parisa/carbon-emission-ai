export default function EmissionCard({ icon, title, value }) {
    return (
        <div className="emission-card">
            <div className="emission-icon">
                {icon}
            </div>

            <div>
                <h3>{title}</h3>
                <p>{value} kg CO₂</p>
            </div>
        </div>
    );
}