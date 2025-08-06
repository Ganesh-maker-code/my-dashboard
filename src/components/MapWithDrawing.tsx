// src/components/MapWithDrawing.tsx
"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDashboardStore } from "../store";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

const MapWithDrawing = () => {
  const { addPolygon } = useDashboardStore();

  useEffect(() => {
    const map = L.map("map-container").setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        remove: false,
      },
      draw: {
        polyline: false,
        marker: false,
        circle: false,
        circlemarker: false,
        rectangle: false,
        polygon: {
          allowIntersection: false,
          showArea: true,
        },
      },
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (e) => {
      const { layer } = e as L.DrawEvents.Created;
      drawnItems.addLayer(layer);

      if (layer instanceof L.Polygon) {
        const latLngs = layer.getLatLngs();
        let coords: [number, number][] = [];

        if (Array.isArray(latLngs) && latLngs.length > 0) {
          // Corrected: Cast latLngs[0] to L.LatLng[] to map over it correctly
          if (Array.isArray(latLngs[0])) {
            const innerLatLngs = latLngs[0] as L.LatLng[];
            coords = innerLatLngs.map((ll) => [ll.lat, ll.lng]);
          } else {
            // Case for L.LatLng[]
            coords = (latLngs as L.LatLng[]).map((ll) => [ll.lat, ll.lng]);
          }
        }

        if (coords.length >= 3) {
          addPolygon({
            id: Date.now().toString(),
            latLngs: coords,
            dataSource: "open-meteo",
            colorRules: [],
          });
        }
      }
    });

    return () => {
      map.remove();
    };
  }, [addPolygon]);

  return (
    <div id="map-container" style={{ flexGrow: 1, height: "100vh" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        id="map-container-leaflet"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default MapWithDrawing;
