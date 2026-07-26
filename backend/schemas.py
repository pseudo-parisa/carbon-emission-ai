from pydantic import BaseModel


class CarbonRequest(BaseModel):
    carDistance: float
    electricityUsage: float
    flightsPerYear: int
    dietaryHabits: str
    shoppingHabits: str


class CarbonResponse(BaseModel):
    transport: float
    electricity: float
    flights: float
    diet: float
    shopping: float
    total: float




