// src/components/ColoredPolygon.tsx
"use client";
import React from "react";
import { Polygon, Popup } from "react-leaflet";
import { useDashboardStore } from "../store";

interface ColorRule {
  operator: "<" | ">";
  value: number;
  color: string;
}

const getPolygonColor = (data: any, rules: ColorRule[]): string => {
  const temperatures = data?.hourly?.temperature_2m || [];
  if (temperatures.length === 0) return "#808080";

  const averageTemp =
    temperatures.reduce((a: number, b: number) => a + b, 0) /
    temperatures.length;

  for (const rule of rules) {
    if (rule.operator === ">" && averageTemp > rule.value) return rule.color;
    if (rule.operator === "<" && averageTemp < rule.value) return rule.color;
  }

  return "#808080";
};

const ColoredPolygon: React.FC<{ polygonId: string }> = ({ polygonId }) => {
  const polygon = useDashboardStore((state) =>
    state.polygons.find((p) => p.id === polygonId)
  );

  if (!polygon) return null;

  const fillColor = getPolygonColor(polygon.fetchedData, polygon.colorRules);

  return (
    <Polygon
      positions={polygon.latLngs}
      pathOptions={{ color: fillColor, fillColor, weight: 2, opacity: 0.8 }}
    >
      <Popup>
        Polygon ID: {polygon.id} <br />
        Average Temp:{" "}
        {polygon.fetchedData?.hourly?.temperature_2m?.length
          ? (
              polygon.fetchedData.hourly.temperature_2m.reduce(
                (a: number, b: number) => a + b,
                0
              ) / polygon.fetchedData.hourly.temperature_2m.length
            ).toFixed(2)
          : "N/A"}{" "}
        °C
      </Popup>
    </Polygon>
  );
};

export default ColoredPolygon;
