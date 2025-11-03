import { NextResponse } from 'next/server'
import { fetchWeatherApi } from 'openmeteo'
import weatherDescriptions from '@/app/data/weatherDescriptions.json'

interface WeatherDescription {
  [key: string]: {
    day: { description: string; image: string };
    night: { description: string; image: string };
  };
}

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Missing latitude or longitude" },
        { status: 400 }
      );
    }

    const params = {
      latitude: Number(lat),
      longitude: Number(lon),
      current: ["temperature_2m", "weather_code"],
      daily: ["temperature_2m_max", "temperature_2m_min"],
      timezone: "auto",
      forecast_days: 1
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    
    
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current();
    const daily = response.daily();

    if (!current || !daily) {
      throw new Error("Missing current or daily data from API");
    }

    const round2 = (num: number) => Math.round(num * 100) / 100;

    const currentTemp = current.variables(0);
    const currentWeatherCode = current.variables(1);
    
    if (!currentTemp || !currentWeatherCode) {
      throw new Error("Missing current weather variables");
    }

    const weatherCode = currentWeatherCode.value();
    const hour = new Date().getUTCHours() + utcOffsetSeconds / 3600;
    const timeOfDay = hour >= 6 && hour < 18 ? "day" : "night";

    const weatherDataMap = weatherDescriptions as WeatherDescription;
    const weatherInfo = weatherDataMap[weatherCode] ?? {
      day: { description: "Unknown", image: "" },
      night: { description: "Unknown", image: "" }
    };

    const { description, image } = weatherInfo[timeOfDay];

    let tempMax: number | null = null;
    let tempMin: number | null = null;

    try {
      const tempMaxVar = daily.variables(0);
      const tempMinVar = daily.variables(1);

      if (tempMaxVar && tempMinVar) {
        const tempMaxArray = tempMaxVar.valuesArray();
        const tempMinArray = tempMinVar.valuesArray();

        if (tempMaxArray && tempMaxArray.length > 0) {
          tempMax = round2(tempMaxArray[0]);
        }
        if (tempMinArray && tempMinArray.length > 0) {
          tempMin = round2(tempMinArray[0]);
        }
      }
    } catch (dailyErr) {
      console.error("Error processing daily data:", dailyErr);
    }

    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature: round2(currentTemp.value()),
        description,
        image
      },
      daily: {
        temperature_min: tempMin,
        temperature_max: tempMax
      }
    };

    return NextResponse.json(weatherData);

  } catch (err) {
    console.error("Weather API error:", err);
    console.error("Error stack:", err instanceof Error ? err.stack : "No stack");
    
    return NextResponse.json(
      { 
        error: "Failed to fetch weather",
        details: err instanceof Error ? err.message : String(err)
      },
      { status: 500 }
    );
  }
};