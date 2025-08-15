import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { RootState, AppDispatch } from '../store/store';
import { fetchConsultants } from '../store/consultantsSlice';
import { Consultant } from '../types/consultant';
import 'leaflet/dist/leaflet.css';

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ConsultantMap: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { consultants, loading, error } = useSelector((state: RootState) => state.consultants);

  useEffect(() => {
    dispatch(fetchConsultants());
  }, [dispatch]);

  const consultantsWithCoords = consultants.filter(c => c.latitude && c.longitude);

  const offsetCoordinates = (consultant: Consultant, index: number): [number, number] => {
    const sameLocationConsultants = consultantsWithCoords.filter(c => 
      c.latitude === consultant.latitude && c.longitude === consultant.longitude
    );
    
    if (sameLocationConsultants.length === 1) {
      return [consultant.latitude!, consultant.longitude!];
    }
    
    const consultantIndex = sameLocationConsultants.findIndex(c => c.id === consultant.id);
    const offsetDistance = 0.01;
    const angle = (2 * Math.PI * consultantIndex) / sameLocationConsultants.length;
    
    const latOffset = Math.cos(angle) * offsetDistance;
    const lngOffset = Math.sin(angle) * offsetDistance;
    
    return [
      consultant.latitude! + latOffset,
      consultant.longitude! + lngOffset
    ];
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px' 
      }}>
        Loading consultants...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        color: 'red'
      }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <MapContainer
        center={[39.8283, -98.5795]} // Center of USA
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {consultantsWithCoords.map((consultant, index) => {
          const [lat, lng] = offsetCoordinates(consultant, index);
          return (
            <Marker
              key={consultant.id}
              position={[lat, lng]}
              icon={defaultIcon}
            >
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
                    {consultant.consultant}
                  </h3>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Branch:</strong> {consultant.branch}
                  </p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Lead:</strong> {consultant.lead}
                  </p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>City:</strong> {consultant.city}
                  </p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Zipcode:</strong> {consultant.zipcode}
                  </p>
                  <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
                    ID: {consultant.originalIdentifier}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
        Showing {consultantsWithCoords.length} of {consultants.length} consultants with coordinates
      </div>
    </div>
  );
};

export default ConsultantMap;