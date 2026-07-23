import { NextResponse } from "next/server";

const LONDON_LAT = 51.5074;
const LONDON_LON = -0.1278;

const WEATHER_TEXT: Record<number, string> = {
  0: "clear",
  1: "mostly clear",
  2: "partly cloudy",
  3: "overcast",
  45: "fog",
  48: "fog",
  51: "drizzle",
  53: "drizzle",
  55: "drizzle",
  56: "freezing drizzle",
  57: "freezing drizzle",
  61: "light rain",
  63: "rain",
  65: "heavy rain",
  66: "freezing rain",
  67: "freezing rain",
  71: "light snow",
  73: "snow",
  75: "heavy snow",
  77: "snow grains",
  80: "showers",
  81: "showers",
  82: "heavy showers",
  85: "snow showers",
  86: "snow showers",
  95: "storm",
  96: "storm",
  99: "storm",
};

export async function GET() {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LONDON_LAT}&longitude=${LONDON_LON}&current=temperature_2m,weather_code&timezone=Europe%2FLondon`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Weather fetch failed: ${res.status}`);
    }

    const data = await res.json();
    const code: number = data?.current?.weather_code;

    return NextResponse.json({
      tempC: Math.round(data?.current?.temperature_2m),
      condition: WEATHER_TEXT[code] ?? "unsettled",
    });
  } catch (error) {
    console.error("WEATHER ERROR:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
