from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS (adjust origins in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



API_KEY = os.getenv("WEATHER_API_KEY")

@app.get("/weather")
async def get_weather(city: str):
    if not city:
        raise HTTPException(status_code=400, detail="City is required")
    try:
        response = requests.get(
            "http://api.weatherapi.com/v1/current.json",
            params={
                "key": API_KEY,
                "q": city,
                "aqi": "no"
            },
        )
        data = response.json()
        
        print("data: ", data)
        if response.status_code == 200:
            result = {
                "location": f"{data['location']['name']}, {data['location']['country']}",
                "temperature_c": data['current']['temp_c'],
                "condition": data['current']['condition']['text'],
                "icon": data['current']['condition']['icon'],
                "last_updated": data['current']['last_updated'],
            }
            return result
        else:
            error_message = data.get("error", {}).get("message", "Error fetching weather data")
            raise HTTPException(status_code=response.status_code, detail=error_message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
