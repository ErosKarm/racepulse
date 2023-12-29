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

const calculateGapsOnOverall = (
  lapTimings: { driverId: string; position: string; time: string }[],
  prevLapData: {
    driverId: string;
    position: string;
    time: string;
    gapToFirst?: string;
    isRetired?: boolean;
  }[]
) => {
  const calculateGapsOnCurrentLap = lapTimings.map((driver) => {
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

  const calculateGapsOverall = calculateGapsOnCurrentLap
    .map((driver) => {
      const prevDriver = prevLapData.find(
        (prev) => prev.driverId === driver.driverId
      );

      if (!prevDriver) {
        return {
          driverId: driver.driverId,
          position: "RETIRED",
          time: "-",
          gapToFirst: null,
          isRetired: true,
        };
      }

      if (
        lapTimings[0].position === "1" &&
        lapTimings[0].driverId === prevLapData[0].driverId
      ) {
        const driverOverallGapToFirst =
          (+prevDriver.gapToFirst! || 0) +
          +driver.gapToFirst -
          +prevLapData[0].gapToFirst!;

        return {
          driverId: driver.driverId,
          position: driver.position,
          time: driver.time,
          isRetired: false,
          gapToFirst: driverOverallGapToFirst.toFixed(3),
        };
      } else {
        const driverOverallGapToFirst =
          (+prevDriver.gapToFirst! || 0) + +driver.gapToFirst;

        return {
          driverId: driver.driverId,
          position: driver.position,
          time: driver.time,
          isRetired: false,
          gapToFirst: driverOverallGapToFirst.toFixed(3),
        };
      }
    })
    .sort((a, b) => {
      if (a.position === "RETIRED" && b.position === "RETIRED") {
        return 0;
      } else if (a.position === "RETIRED") {
        return 1;
      } else if (b.position === "RETIRED") {
        return -1;
      }

      return parseInt(a.position) - parseInt(b.position);
    });

  return calculateGapsOverall;
  // .map((driver) => {
  //   const prevDriver = prevLapData.find(
  //     (prev) => prev.driverId === driver.driverId
  //   );

  //   if (!prevDriver) {
  //     return {
  //       driverId: driver.driverId,
  //       position: "RETIRED",
  //       time: "-",
  //       gapToFirst: null,
  //       isRetired: true,
  //     };
  //   }

  //   const driverOverallGapToFirst =
  //     (+prevDriver.gapToFirst! || 0) + +driver.gapToFirst;

  //   return {
  //     driverId: driver.driverId,
  //     position: driver.position,
  //     time: driver.time,
  //     isRetired: false,
  //     gapToFirst: driverOverallGapToFirst.toFixed(3),
  //   };
  // })
  // .sort((a, b) => {
  //   if (a.position === "RETIRED" && b.position === "RETIRED") {
  //     return 0;
  //   } else if (a.position === "RETIRED") {
  //     return 1;
  //   } else if (b.position === "RETIRED") {
  //     return -1;
  //   }

  //   return parseInt(a.position) - parseInt(b.position);
  // });
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
          Timings: calculateGapsOnOverall(
            lap.Timings,
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
