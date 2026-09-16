from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas import CarbonRequest, CarbonResponse, AIRecommendationRequest, AIInsightRequest, AIInsightResponse, CalculationResponse, UserCreate, UserResponse, UserLogin, TokenResponse

from ai_service import get_recommendations, get_insights

from database import Base, SessionLocal, engine
import models
from auth import create_access_token, hash_password, verify_password


app = FastAPI()
Base.metadata.create_all(bind=engine)
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

@app.post("/register", response_model=UserResponse)
def register(data: UserCreate):
    db = SessionLocal()

    try:
        existing_user = (
            db.query(models.User)
            .filter(models.User.email == data.email)
            .first()
        )

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered."
            )

        hashed_password = hash_password(data.password)

        user = models.User(
            email=data.email,
            password_hash=hashed_password
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user

    finally:
        db.close()

@app.post("/login", response_model=TokenResponse)
def login(data: UserLogin):
    db = SessionLocal()

    try:
        user = (
            db.query(models.User)
            .filter(models.User.email == data.email)
            .first()
        )

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password."
            )

        if not verify_password(data.password, user.password_hash):
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password."
            )

        access_token = create_access_token(user.id)

        return TokenResponse(
            access_token=access_token,
            token_type="bearer"
        )

    finally:
        db.close()

@app.post("/calculate", response_model=CarbonResponse)
def calculate(data: CarbonRequest):
    db = SessionLocal()

    try:
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

        total = transport + electricity + flights + diet + shopping

        calculation = models.Calculation(
            transport=transport,
            electricity=electricity,
            flights=flights,
            diet=diet,
            shopping=shopping,
            total=total
        )

        db.add(calculation)
        db.commit()
        db.refresh(calculation)

        return CarbonResponse(
            transport=transport,
            electricity=electricity,
            flights=flights,
            diet=diet,
            shopping=shopping,
            total=total
        )

    finally:
        db.close()

@app.get("/calculations", response_model=list[CalculationResponse])
def get_calculations():
    db = SessionLocal()

    try:
        calculations = (
            db.query(models.Calculation)
            .order_by(models.Calculation.created_at.asc())
            .all()
        )

        return calculations

    finally:
        db.close()

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