import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isInitialized: false,
  drivers: {
    all_drivers: [],
    total: 0,
  },
  trips: {
    active_trips: [],
    completed_trips: [],
    booked_trips: [],
  },
  vehicles: {
    all: [],
  },
  passengers: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInitialized(state) {
      state.isInitialized = true;
    },
    setAllDrivers(state, action) {
      state.drivers.all_drivers = action.payload;
    },
    setPassengers(state, action) {
      state.passengers = action.payload;
    },
    setActiveTrips(state, action) {
      state.trips.active_trips = action.payload;
    },
    setCompletedTrips(state, action) {
      state.trips.completed_trips = action.payload;
    },
    setBookedTrips(state, action) {
      state.trips.booked_trips = action.payload;
    },
    setVehicles(state, action) {
      state.vehicles.all = action.payload;
    },
  },
});

export const {
  setInitialized,
  setAllDrivers,
  setPassengers,
  setActiveTrips,
  setCompletedTrips,
  setBookedTrips,
  setVehicles,
} = appSlice.actions;

export const appReducer = appSlice.reducer;
