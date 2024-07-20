import React, { useState, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker, Libraries } from '@react-google-maps/api';

const libraries: Libraries = ['places'];

const mapContainerStyle = {
  width: '80vw',
  height: '60vh',
  margin: '20px auto',
  border: '2px solid #ccc',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const center = {
  lat: 48.3794,
  lng: 31.1656,
};

interface MarkerType {
  lat: number;
  lng: number;
  time: Date;
  id: number; // Додаємо поле для ідентифікації маркера
}

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDrOsN-pOfgEyWgobk8SnzJD9ogAt3Z76c',
    libraries,
  });

  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [nextId, setNextId] = useState(1);

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();

    if (lat !== undefined && lng !== undefined) {
      setMarkers((current) => [
        ...current,
        {
          lat,
          lng,
          time: new Date(),
          id: nextId, // Додаємо унікальний ідентифікатор
        },
      ]);
      setNextId(nextId + 1); // Оновлюємо ідентифікатор для наступного маркера
    }
  }, [nextId]);

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent, markerId: number) => {
    if (!e.latLng) return;

    const newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkers((current) =>
      current.map((marker) =>
        marker.id === markerId ? { ...marker, ...newPosition } : marker
      )
    );
  };

  const handleMarkerClick = (markerId: number) => {
    setMarkers((current) => current.filter((marker) => marker.id !== markerId));
  };

  const clearMarkers = () => {
    setMarkers([]);
    setNextId(1); // Скидаємо ідентифікатор
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div className="map-container">
      <button onClick={clearMarkers} style={{ margin: '10px', padding: '10px' }}>Delete All Markers</button>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onClick={onMapClick}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            label={marker.id.toString()} 
            draggable
            onDragEnd={(e) => handleMarkerDragEnd(e, marker.id)}
            onClick={() => handleMarkerClick(marker.id)} 
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
