export interface Consultant {
  id: string;
  originalIdentifier: string;
  consultant: string;
  branch: string;
  lead: string;
  city: string;
  zipcode: string;
  latitude?: number;
  longitude?: number;
}

export interface CSVRow {
  Identifier: string;
  Consultant: string;
  Branch: string;
  Lead: string;
  City: string;
  Zipcode: string;
}