import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container page-enter">

            <section className="hero-section">

                <p className="hero-label">
                    🌿 CARBON FOOTPRINT TRACKER
                </p>

                <h1>
                    Understand Your
                    <span> Carbon Footprint.</span>
                </h1>

                <p className="hero-description">
                    Discover how your everyday choices contribute
                    to your carbon emissions and find out where
                    your biggest impact comes from.
                </p>

                <button className="hero-button" onClick={() => navigate("/calculator")}> Calculate My Footprint → </button>

            </section>


            <section className="how-section">

                <h2>How It Works</h2>

                <p className="section-description">
                    Three simple steps to understand your environmental impact.
                </p>


                <div className="steps-grid">

                    <div className="step-card">

                        <div className="step-number">
                            01
                        </div>

                        <h3>Enter Your Habits</h3>

                        <p>
                            Tell us about your transport, electricity,
                            flights, diet and shopping habits.
                        </p>

                    </div>


                    <div className="step-card">

                        <div className="step-number">
                            02
                        </div>

                        <h3>Calculate</h3>

                        <p>
                            Our calculator estimates your annual
                            carbon footprint from the information you provide.
                        </p>

                    </div>


                    <div className="step-card">

                        <div className="step-number">
                            03
                        </div>

                        <h3>Understand Your Impact</h3>

                        <p>
                            See where your emissions come from and
                            identify the areas with the biggest impact.
                        </p>

                    </div>

                </div>

            </section>


            <section className="info-section">

                <div className="info-card">

                    <p className="hero-label">
                        WHY IT MATTERS
                    </p>

                    <h2>
                        Awareness is the first step toward change.
                    </h2>

                    <p>
                        Your carbon footprint is influenced by many
                        everyday decisions. Understanding those
                        contributions can help you make more informed
                        choices about where you can reduce your impact.
                    </p>

                </div>

            </section>

        </div>
    );
}