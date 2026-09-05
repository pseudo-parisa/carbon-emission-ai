from fastapi import FastAPI
from schemas import CarbonRequest, CarbonResponse, AIRecommendationRequest, AIInsightRequest, AIInsightResponse
from fastapi.middleware.cors import CORSMiddleware
from ai_service import get_recommendations, get_insights

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Carbon Compass API is running!"}


@app.post("/calculate", response_model=CarbonResponse)
def calculate(data: CarbonRequest):

    transport = data.carDistance * 0.192
    electricity = data.electricityUsage * 12 * 0.4
    flights = data.flightsPerYear * 250

    diet_map = {
        "vegetarian": 1500,
        "mixed": 2200,
        "heavyMeat": 3300
    }

    shopping_map = {
        "low": 200,
        "medium": 500,
        "high": 900
    }

    diet = diet_map[data.dietaryHabits]
    shopping = shopping_map[data.shoppingHabits]

    total = (
        transport
        + electricity
        + flights
        + diet
        + shopping
    )

    return CarbonResponse(
        transport=transport,
        electricity=electricity,
        flights=flights,
        diet=diet,
        shopping=shopping,
        total= total
    )

@app.post("/ai-recommendations")
def ai_recommendations(data: AIRecommendationRequest):
    recommendations = get_recommendations(data)

    return {
        "recommendations": recommendations
    }

@app.post("/ai-insights", response_model=AIInsightResponse)
def ai_insights(data: AIInsightRequest):
    insights = get_insights(data)

    return {
        "insights": insights
    }