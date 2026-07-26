import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Carbon Compass AI</h1>

            <Link to="/calculator">
                <button>Start Calculator</button>
            </Link>
            <br></br>
            <Link to="/results">
                <button>View Results</button>
            </Link>
        </div>
    );
}