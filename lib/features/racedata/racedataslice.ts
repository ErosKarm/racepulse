import { createSlice } from "@reduxjs/toolkit";

type finishResultType = {
  Driver: {
    code: string;
    dateOfBirth: string;
    driverId: string;
    familyName: string;
    givenName: string;
    nationality: string;
    permanentNumber: string;
  };

  Time: {
    time: string;
  };

  Constructor: {
    name: string;
    constructorId: string;
    nationality: string;
  };

  grid: string;
  laps: string;
  number: string;
  points: string;
  position: string;
  positionText: string;
  status: string;
};

type LapDataType = {
  number: number;
  currentLap: number;
  Timings: {
    driverId: string;
    position: string;
    isRetired?: boolean;
    time: string;
    gapToFirst?: string;
  }[];
};

export type RaceDataState = {
  raceData: {
    lapData: LapDataType[];
    currentLap: number;
    fastestLap: {
      driverId: undefined | string;
      position: undefined | string;
      time: undefined | string;
      lap: undefined | string;
    };
  };

  circuitInfo: {
    date: undefined | string;
    raceName: undefined | string;
    round: undefined | string;
    season: undefined | string;
    time: undefined | string;
    circuitName: undefined | string;
    location: {
      lat: undefined | string;
      long: undefined | string;
      locality: undefined | string;
      country: undefined | string;
    };
  };

  finishResult: finishResultType[];

  loading: boolean;
  error: string | null;
};

const initialState: RaceDataState = {
  raceData: {
    lapData: [],
    currentLap: 0,
    fastestLap: {
      driverId: undefined,
      position: undefined,
      time: undefined,
      lap: undefined,
    },
  },

  circuitInfo: {
    date: undefined,
    raceName: undefined,
    round: undefined,
    season: undefined,
    time: undefined,
    circuitName: undefined,
    location: {
      lat: undefined,
      long: undefined,
      locality: undefined,
      country: undefined,
    },
  },

  finishResult: [],

  loading: false,
  error: null,
};

export const raceData = createSlice({
  name: "raceData",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLapData: (state, action) => {
      state.raceData.lapData = action.payload;
    },

    setCircuitInfo: (state, action) => {
      state.circuitInfo = action.payload;
    },

    setFinishingResult: (state, action) => {
      state.finishResult = action.payload;
    },

    setCurrentLap: (state, action) => {
      state.raceData.currentLap = action.payload;
    },

    setDecrementLap: (state) => {
      if (state.raceData.currentLap > 0) {
        state.raceData.currentLap -= 1;
      }
    },

    setIncrementLap: (state) => {
      state.raceData.currentLap += 1;
    },
  },
});

export const {
  setLapData,
  setFinishingResult,
  setCircuitInfo,
  setLoading,
  setCurrentLap,
  setDecrementLap,
  setIncrementLap,
} = raceData.actions;

export default raceData.reducer;
