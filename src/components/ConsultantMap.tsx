import React, { useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    dispatch(fetchConsultants());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const getMapHeight = () => {
    if (isMobile) {
      return 'calc(100vh - 120px)'; // Account for header
    }
    return '600px';
  };

  const loadingStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: getMapHeight(),
    fontSize: isMobile ? '16px' : '18px',
    padding: '20px'
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        Loading consultants...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        ...loadingStyle,
        color: 'red',
        textAlign: 'center'
      }}>
        Error: {error}
      </div>
    );
  }

  const mapContainerStyle: React.CSSProperties = {
    height: getMapHeight(),
    width: '100%',
    borderRadius: isMobile ? '0' : '8px',
    overflow: 'hidden'
  };

  const popupContentStyle: React.CSSProperties = {
    minWidth: isMobile ? '250px' : '200px',
    maxWidth: isMobile ? '300px' : '350px'
  };

  const consultantNameStyle: React.CSSProperties = {
    margin: '0 0 10px 0',
    fontSize: isMobile ? '18px' : '16px',
    fontWeight: 'bold',
    color: '#282c34'
  };

  const detailStyle: React.CSSProperties = {
    margin: '8px 0',
    fontSize: isMobile ? '15px' : '14px',
    lineHeight: '1.4'
  };

  const idStyle: React.CSSProperties = {
    margin: '8px 0 0 0',
    fontSize: isMobile ? '13px' : '12px',
    color: '#666'
  };

  const statsStyle: React.CSSProperties = {
    marginTop: isMobile ? '8px' : '10px',
    textAlign: 'center',
    fontSize: isMobile ? '13px' : '14px',
    color: '#666',
    padding: isMobile ? '0 10px' : '0'
  };

  return (
    <div style={mapContainerStyle}>
      <MapContainer
        center={[39.8283, -98.5795]} // Center of USA
        zoom={isMobile ? 3 : 4}
        style={{ height: '100%', width: '100%' }}
        zoomControl={!isMobile}
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
              <Popup maxWidth={isMobile ? 300 : 350}>
                <div style={popupContentStyle}>
                  <h3 style={consultantNameStyle}>
                    {consultant.consultant}
                  </h3>
                  <p style={detailStyle}>
                    <strong>Branch:</strong> {consultant.branch}
                  </p>
                  <p style={detailStyle}>
                    <strong>Lead:</strong> {consultant.lead}
                  </p>
                  <p style={detailStyle}>
                    <strong>City:</strong> {consultant.city}
                  </p>
                  <p style={detailStyle}>
                    <strong>Zipcode:</strong> {consultant.zipcode}
                  </p>
                  <p style={idStyle}>
                    ID: {consultant.originalIdentifier}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div style={statsStyle}>
        Showing {consultantsWithCoords.length} of {consultants.length} consultants with coordinates
      </div>
    </div>
  );
};

export default ConsultantMap;