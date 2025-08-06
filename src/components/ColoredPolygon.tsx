// src/components/ColoredPolygon.tsx
import { Polygon } from "react-leaflet";
import { useMemo } from "react";
import { useDashboardStore, PolygonData, WeatherData } from "../store";

interface ColoredPolygonProps {
  polygon: PolygonData;
}

const ColoredPolygon: React.FC<ColoredPolygonProps> = ({ polygon }) => {
  const { selectedTimeRange } = useDashboardStore();
  const [startTime, endTime] = selectedTimeRange;

  // Corrected: Use the WeatherData interface instead of 'any'
  const weatherData: WeatherData | null = polygon.fetchedData;

  const polygonColor = useMemo(() => {
    if (!weatherData) {
      return "#808080"; // Default color for no data
    }

    // Find the average temperature for the selected time range
    const startTimestamp = startTime;
    const endTimestamp = endTime;

    const relevantTemps = weatherData.hourly.time
      .map((timeStr, index) => ({
        time: new Date(timeStr).getTime(),
        temp: weatherData.hourly.temperature_2m[index],
      }))
      .filter(
        (item) => item.time >= startTimestamp && item.time <= endTimestamp
      )
      .map((item) => item.temp);

    if (relevantTemps.length === 0) {
      return "#808080";
    }

    const averageTemp =
      relevantTemps.reduce((sum, temp) => sum + temp, 0) / relevantTemps.length;

    // Apply coloring rules
    for (const rule of polygon.colorRules) {
      if (rule.operator === ">" && averageTemp > rule.value) {
        return rule.color;
      }
      if (rule.operator === "<" && averageTemp < rule.value) {
        return rule.color;
      }
    }

    return "#808080"; // Default if no rule matches
  }, [weatherData, polygon.colorRules, startTime, endTime]);

  return (
    <Polygon
      positions={polygon.latLngs}
      pathOptions={{ color: polygonColor }}
    />
  );
};

export default ColoredPolygon;
