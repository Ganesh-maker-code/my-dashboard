// src/store.ts
import { create } from "zustand";

// Define the interface for the fetched weather data
export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

export interface ColorRule {
  operator: ">" | "<";
  value: number;
  color: string;
}

export interface PolygonData {
  id: string;
  latLngs: [number, number][];
  dataSource: "open-meteo";
  colorRules: ColorRule[];
  // Corrected: Use the new WeatherData interface instead of 'any'
  fetchedData: WeatherData | null;
}

interface DashboardState {
  polygons: PolygonData[];
  selectedTimeRange: [number, number];
  addPolygon: (polygon: Omit<PolygonData, "fetchedData">) => void;
  updatePolygon: (id: string, data: Partial<PolygonData>) => void;
  deletePolygon: (id: string) => void;
  setSelectedTimeRange: (range: [number, number]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  polygons: [],
  selectedTimeRange: [0, 0],
  addPolygon: (polygon) =>
    set((state) => ({
      polygons: [...state.polygons, { ...polygon, fetchedData: null }],
    })),
  updatePolygon: (id, data) =>
    set((state) => ({
      polygons: state.polygons.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),
  deletePolygon: (id) =>
    set((state) => ({ polygons: state.polygons.filter((p) => p.id !== id) })),
  setSelectedTimeRange: (range) => set({ selectedTimeRange: range }),
}));
