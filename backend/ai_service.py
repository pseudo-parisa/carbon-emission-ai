import os
from dotenv import load_dotenv
from google import genai
from schemas import AIRecommendationRequest, AIInsightRequest

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
        1. Give 3 practical and realistic actions the user can take to reduce their carbon footprint.
        2. Base each recommendation specifically on the user's emission data.
        3. Prioritize actions that could make a meaningful difference.
        4. Do not repeat or explain which categories have the highest emissions.
        5. Do not provide a general analysis of the user's footprint.
        6. Do not give generic advice unrelated to the user's results.
        7. Do not shame or judge the user.
        8. Keep the recommendations concise and easy to understand.
        9. Do not invent precise carbon savings unless they can be supported by the provided data.
        10. Do not use Markdown formatting such as **bold**, bullet points, headings with #, or other Markdown symbols.
        11. Use plain text only.

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

def get_insights(data: AIInsightRequest):
    total = data.total

    transport_percentage = (data.transport / total) * 100 if total > 0 else 0
    electricity_percentage = (data.electricity / total) * 100 if total > 0 else 0
    flights_percentage = (data.flights / total) * 100 if total > 0 else 0
    diet_percentage = (data.diet / total) * 100 if total > 0 else 0
    shopping_percentage = (data.shopping / total) * 100 if total > 0 else 0

    prompt = f"""
        You are the carbon analysis assistant for Carbon Emission AI.

        Analyze the user's estimated annual carbon footprint and provide meaningful
        insights about the overall pattern of their emissions.

        The user's verified annual emissions are:

        Transport: {data.transport:.2f} kg CO2 ({transport_percentage:.1f}%)
        Electricity: {data.electricity:.2f} kg CO2 ({electricity_percentage:.1f}%)
        Flights: {data.flights:.2f} kg CO2 ({flights_percentage:.1f}%)
        Diet: {data.diet:.2f} kg CO2 ({diet_percentage:.1f}%)
        Shopping: {data.shopping:.2f} kg CO2 ({shopping_percentage:.1f}%)
        Total: {data.total:.2f} kg CO2

        Analyze the distribution and patterns in the user's footprint.

        Your response should include:

        1. Overall assessment:
        Explain what stands out about the user's overall carbon footprint
        and how concentrated or distributed their emissions are.

        2. Emission pattern:
        Explain how the emissions are distributed across the categories.
        Use the provided percentages when useful.

        3. Notable insight:
        Identify one meaningful observation that may not be immediately obvious
        from simply looking at the emission values.

        4. Focus:
        Explain what the overall pattern suggests the user should pay attention to
        when thinking about their long-term carbon footprint.

        Important rules:
        - Do not give recommendations or specific actions.
        - Do not repeat advice from a sustainability recommendations section.
        - Do not simply list the categories from highest to lowest.
        - Do not shame or judge the user.
        - Only use the information provided.
        - Do not invent additional user behavior or circumstances.
        - Do not invent precise carbon savings.
        - Keep the analysis concise and easy to understand.
        - Do not use Markdown formatting such as **bold**, bullet points, headings with #,
        or other Markdown symbols.
        - Use plain text only.

        Format your response exactly like this:

        Overall assessment:
        [analysis]

        Emission pattern:
        [analysis]

        Notable insight:
        [analysis]

        Focus:
        [analysis]
        """

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    return response.text