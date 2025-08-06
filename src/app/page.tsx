// src/app/page.tsx
"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useDashboardStore } from "../store";
import { fetchWeatherData } from "../utils/api";

// Dynamically import the map component to ensure it's client-side rendered
const MapWithDrawing = dynamic(() => import("../components/MapWithDrawing"), {
  ssr: false,
});

export default function Home() {
  const { polygons, updatePolygon, selectedTimeRange } = useDashboardStore();
  const [startTime, endTime] = selectedTimeRange;

  useEffect(() => {
    polygons.forEach(async (polygon) => {
      // Logic for fetching weather data
      if (polygon.fetchedData) {
        return;
      }

      if (polygon.latLngs && polygon.latLngs.length > 0) {
        try {
          const data = await fetchWeatherData(polygon, startTime, endTime);
          if (data) {
            updatePolygon(polygon.id, { fetchedData: data });
          }
        } catch (error) {
          console.error(
            `Failed to fetch data for polygon ${polygon.id}`,
            error
          );
        }
      }
    });
  }, [polygons, startTime, endTime, updatePolygon]);

  return (
    // The MapWithDrawing component is the primary content of the page
    <MapWithDrawing />
  );
}
