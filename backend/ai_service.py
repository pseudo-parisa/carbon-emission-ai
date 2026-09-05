import os
from dotenv import load_dotenv
from google import genai
from schemas import AIRecommendationRequest

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is not set.")

client = genai.Client(api_key=api_key)

    
def get_recommendations(data: AIRecommendationRequest):
    prompt = f"""
You are the sustainability assistant for Carbon Compass, a carbon footprint calculator.

Analyze the user's estimated annual carbon emissions and provide personalized,
practical recommendations for reducing their carbon footprint.

The user's estimated emissions are:

Transport: {data.transport:.2f} kg CO2
Electricity: {data.electricity:.2f} kg CO2
Flights: {data.flights:.2f} kg CO2
Diet: {data.diet:.2f} kg CO2
Shopping: {data.shopping:.2f} kg CO2
Total: {data.total:.2f} kg CO2

Instructions:
1. Identify the user's two highest-emission categories.
2. Explain briefly why these categories are significant.
3. Give 3 practical and realistic recommendations specifically based on their results.
4. Prioritize changes that could make a meaningful difference.
5. Do not give generic advice unrelated to the user's results.
6. Do not shame or judge the user.
7. Keep the response concise and easy to read.
8. Do not invent precise carbon savings unless they can be supported by the provided data.

Format your response as:

Your biggest impact:
[brief explanation]

Recommended actions:
1. [recommendation]
2. [recommendation]
3. [recommendation]

Focus on practical lifestyle changes rather than unrealistic suggestions.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    return response.text