import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Consultant, ConsultantState } from '../types/consultant';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const fetchConsultants = createAsyncThunk(
  'consultants/fetchConsultants',
  async () => {
    const response = await fetch(`${API_URL}/api/consultants`);
    if (!response.ok) {
      throw new Error('Failed to fetch consultants');
    }
    return response.json() as Promise<Consultant[]>;
  }
);

const initialState: ConsultantState = {
  consultants: [],
  loading: false,
  error: null,
};

const consultantsSlice = createSlice({
  name: 'consultants',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsultants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsultants.fulfilled, (state, action: PayloadAction<Consultant[]>) => {
        state.loading = false;
        state.consultants = action.payload;
      })
      .addCase(fetchConsultants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch consultants';
      });
  },
});

export const { clearError } = consultantsSlice.actions;
export default consultantsSlice.reducer;