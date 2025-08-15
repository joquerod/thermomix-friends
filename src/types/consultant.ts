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

export interface ConsultantState {
  consultants: Consultant[];
  loading: boolean;
  error: string | null;
}