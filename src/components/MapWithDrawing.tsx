// src/components/MapWithDrawing.tsx
"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  useMapEvents,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import { useDashboardStore } from "../store";
import ColoredPolygon from "./ColoredPolygon";

delete (L.Icon.Default.prototype as any)._get;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

const MapWithDrawing: React.FC = () => {
  const { addPolygon, polygons } = useDashboardStore();

  const onCreated = (e: any) => {
    const { layer } = e;
    if (layer instanceof L.Polygon) {
      const latLngs = layer
        .getLatLngs()[0]
        .map((ll: L.LatLng) => [ll.lat, ll.lng]);
      if (latLngs.length >= 3) {
        addPolygon({
          id: Date.now().toString(),
          latLngs: latLngs as [number, number][],
          dataSource: "open-meteo",
          colorRules: [
            { operator: ">", value: 25, color: "#ff0000" },
            { operator: "<", value: 18, color: "#0000ff" },
          ],
        });
      }
    }
  };

  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => {
        // Can be used to store map center, but not required for this task
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[52.52, 13.415]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      maxZoom={13}
      minZoom={13}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onCreated}
          draw={{
            rectangle: false,
            circle: false,
            marker: false,
            circlemarker: false,
            polygon: {
              allowIntersection: false,
              shapeOptions: { color: "blue" },
              showArea: true,
              maxPoints: 12,
            },
          }}
        />
      </FeatureGroup>
      {polygons.map((p) => (
        <ColoredPolygon key={p.id} polygonId={p.id} />
      ))}
      <MapEvents />
    </MapContainer>
  );
};

export default MapWithDrawing;
