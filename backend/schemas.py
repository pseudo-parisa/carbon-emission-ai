from pydantic import BaseModel, Field
from typing import Literal


class CarbonRequest(BaseModel):
    carDistance: float = Field(..., ge=0, le=200000)
    electricityUsage: float = Field(..., ge=0, le=10000)
    flightsPerYear: int = Field(..., ge=0, le=365)
    dietaryHabits: Literal["vegetarian", "mixed", "heavyMeat"] 
    shoppingHabits: Literal["low", "medium", "high"] 


class CarbonResponse(BaseModel):
    transport: float
    electricity: float
    flights: float
    diet: float
    shopping: float
    total: float

class AIRecommendationRequest(BaseModel):
    transport: float
    electricity: float
    flights: float
    diet: float
    shopping: float
    total: float

class AIRecommendationResponse(BaseModel):
    recommendations: str

