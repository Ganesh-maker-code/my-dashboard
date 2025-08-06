// src/utils/api.ts
import { PolygonData } from "../store";

const OPEN_METEO_API_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchWeatherData = async (
  polygon: PolygonData,
  startTime: number,
  endTime: number
) => {
  if (!polygon.latLngs || polygon.latLngs.length === 0) {
    console.error(
      "Cannot fetch weather data for a polygon with no coordinates."
    );
    return null;
  }

  // Corrected: Explicitly type the parameters of the reduce function
  const centerLat =
    polygon.latLngs.reduce(
      (sum: number, p: [number, number]) => sum + p[0],
      0
    ) / polygon.latLngs.length;
  const centerLng =
    polygon.latLngs.reduce(
      (sum: number, p: [number, number]) => sum + p[1],
      0
    ) / polygon.latLngs.length;

  // Format the dates for the API
  const start_date = new Date(startTime).toISOString().split("T")[0];
  const end_date = new Date(endTime).toISOString().split("T")[0];

  const params = new URLSearchParams({
    latitude: centerLat.toFixed(4),
    longitude: centerLng.toFixed(4),
    hourly: "temperature_2m",
    timezone: "auto",
    start_date: start_date,
    end_date: end_date,
  });

  try {
    const response = await fetch(`${OPEN_METEO_API_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`API returned status code ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
};
