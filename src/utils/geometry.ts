// src/utils/geometry.ts
export const getCentroid = (latLngs: [number, number][]): [number, number] => {
  let lat = 0;
  let lng = 0;
  for (const [pLat, pLng] of latLngs) {
    lat += pLat;
    lng += pLng;
  }
  return [lat / latLngs.length, lng / latLngs.length];
};
