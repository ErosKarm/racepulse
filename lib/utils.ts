import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const convertTimeToSeconds = (lapTime: string) => {
  const [minutes, secondsWithMilliseconds] = lapTime.split(":");
  const [seconds, milliseconds] = secondsWithMilliseconds.split(".");

  const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  const totalTimeInSeconds = parseFloat(`${totalSeconds}.${milliseconds}`);

  return totalTimeInSeconds;
};

type lapDataType = {
  number: number;
  Timings: {
    driverId: string;
    position: string;
    time: string;
  }[];
};

const calculateInitialGap = (
  lapTimings: { driverId: string; position: string; time: string }[]
) => {
  return lapTimings.map((driver) => {
    if (driver.position === "1") {
      return { ...driver, isRetired: false, gapToFirst: "0" };
    } else {
      const firstPositionLapTime = convertTimeToSeconds(lapTimings[0].time);
      const driverLapTime = convertTimeToSeconds(driver.time);
      const gapToFirst = driverLapTime - firstPositionLapTime;

      return {
        ...driver,
        isRetired: false,
        gapToFirst: gapToFirst.toFixed(3),
      };
    }
  });
};

const calculateGaps = (
  lapTimings: { driverId: string; position: string; time: string }[],
  lapIndex: number,
  prevLapData: {
    driverId: string;
    position: string;
    time: string;
    gapToFirst?: string;
    isRetired?: boolean;
  }[]
) => {
  const calculatedGapsOnCurrentLap = lapTimings.map((driver) => {
    if (driver.position === "1") {
      return { ...driver, isRetired: false, gapToFirst: "0" };
    } else {
      const firstPositionLapTime = convertTimeToSeconds(lapTimings[0].time);
      const driverLapTime = convertTimeToSeconds(driver.time);
      const gapToFirst = driverLapTime - firstPositionLapTime;

      return {
        ...driver,
        gapToFirst: gapToFirst.toFixed(3),
      };
    }
  });

  const calculatedGapsOnOverall = prevLapData
    .map((driver, index) => {
      const findDriver = calculatedGapsOnCurrentLap.find(
        (prevDriver) => prevDriver.driverId === driver.driverId
      );

      if (!findDriver) {
        return {
          driverId: driver.driverId,
          position: "RETIRED",
          time: "-",
          gapToFirst: null,
          isRetired: true,
        };
      }

      const driverOverallGapToFirst =
        (+driver.gapToFirst! || 0) + +findDriver.gapToFirst;

      return {
        driverId: driver.driverId,
        position: findDriver.position,
        time: findDriver.time,
        isRetired: false,
        gapToFirst: driverOverallGapToFirst.toFixed(3),
      };
    })
    .sort((a, b) => {
      // Handle the case where "position" is "RETIRED"
      if (a.position === "RETIRED" && b.position === "RETIRED") {
        return 0;
      } else if (a.position === "RETIRED") {
        return 1; // Move "RETIRED" to the end
      } else if (b.position === "RETIRED") {
        return -1; // Move "RETIRED" to the end
      }

      // Parse "position" as numbers and compare
      return parseInt(a.position) - parseInt(b.position);
    });

  return calculatedGapsOnOverall;
};

function calculateGapsBetweenDrivers(lapData: lapDataType[]) {
  lapData.forEach((lap, index) => {
    if (index === 0) {
      lapData = [
        ...lapData.slice(0, index),
        { ...lap, Timings: calculateInitialGap(lap.Timings) },
        ...lapData.slice(index + 1),
      ];
    } else if (index > 0) {
      lapData = [
        ...lapData.slice(0, index),
        {
          ...lap,
          Timings: calculateGaps(
            lap.Timings,
            index,
            lapData[index - 1].Timings
          ),
        },
        ...lapData.slice(index + 1),
      ];
    }
  });

  return lapData;
}

export async function fetchRaceData(year: string, circuit: string) {
  try {
    const raceData = await fetch(
      `https://ergast.com/api/f1/${year}/${circuit}/laps.json?limit=1100`
    );

    const raceDataResult = await raceData.json();

    if (!raceData.ok) {
      throw new Error("Failed to fetch");
    }

    const calculatedGaps = calculateGapsBetweenDrivers(
      raceDataResult.MRData.RaceTable.Races[0].Laps
    );

    return calculatedGaps;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchRaceResult(year: string, circuit: string) {
  try {
    const raceResult = await fetch(
      `https://ergast.com/api/f1/${year}/${circuit}/results.json?limit=1100`
    );

    if (!raceResult.ok) {
      throw new Error("Failed to fetch");
    }

    const raceResultData = await raceResult.json();

    return raceResultData;
  } catch (error) {
    console.log(error);
  }
}
