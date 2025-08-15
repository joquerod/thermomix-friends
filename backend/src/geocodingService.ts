import { Consultant } from './types';

interface GeocodeResult {
  lat: number;
  lon: number;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const geocodeZipcode = async (zipcode: string): Promise<GeocodeResult | null> => {
  try {
    const response = await fetch(`https://api.zippopotam.us/us/${zipcode}`);
    
    if (!response.ok) {
      console.warn(`Failed to geocode zipcode ${zipcode}: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    if (data.places && data.places.length > 0) {
      const place = data.places[0];
      return {
        lat: parseFloat(place.latitude),
        lon: parseFloat(place.longitude)
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error geocoding zipcode ${zipcode}:`, error);
    return null;
  }
};

export const geocodeConsultants = async (consultants: Consultant[]): Promise<Consultant[]> => {
  const uniqueZipcodes = new Set(consultants.map(c => c.zipcode));
  const geocodeCache = new Map<string, GeocodeResult | null>();
  
  console.log(`Geocoding ${uniqueZipcodes.size} unique zipcodes...`);
  
  for (const zipcode of uniqueZipcodes) {
    const result = await geocodeZipcode(zipcode);
    geocodeCache.set(zipcode, result);
    
    await delay(100);
  }
  
  const consultantsWithCoords = consultants.map(consultant => {
    const coords = geocodeCache.get(consultant.zipcode);
    if (coords) {
      return {
        ...consultant,
        latitude: coords.lat,
        longitude: coords.lon
      };
    }
    return consultant;
  });
  
  const withCoords = consultantsWithCoords.filter(c => c.latitude && c.longitude);
  console.log(`Successfully geocoded ${withCoords.length} out of ${consultants.length} consultants`);
  
  return consultantsWithCoords;
};