import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useLocation } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'

const Map = () => {
  const { state } = useLocation()

  // Fallback if user opens /map directly
  const latitude = state?.latitude || 11.05
  const longitude = state?.longitude || 76.06
  const name = state?.name || "Station"
  const location = state?.location || ""

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <Marker position={[latitude, longitude]}>
          <Popup>
            <strong>{name}</strong><br />
            {location}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map
