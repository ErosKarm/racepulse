import { RaceDataState } from "../features/racedata/racedataslice";
import constructorColors from "../constructor-colors";

const useDriverInfo = (
  selectedDriver: string | undefined,
  raceData: RaceDataState
) => {
  if (raceData.raceData.currentLap === 0 || selectedDriver === undefined) {
    return {
      position: "",
      firstName: "",
      lastName: "",
      lapTime: "",
      isRetired: false,
      gapToLeader: "",
      previousLapTime: "",
      gapToAhead: "",
      driverConstructor: "",
      gainedPositions: "",
      startingPosition: "",
      permanentNumber: "",
      color: "",
    };
  }

  const selectedDriverData = raceData.raceData.lapData[
    raceData.raceData.currentLap === 0 ? 1 : raceData.raceData.currentLap - 1
  ]?.Timings.filter((driver) => driver.driverId === selectedDriver);

  const finishResultData = raceData.finishResult.filter((driver) => {
    return driver.Driver.driverId === selectedDriver;
  });

  let gapToAhead = null;

  if (selectedDriverData[0]?.position !== "1") {
    const positionAhead = String(Number(selectedDriverData[0]?.position) - 1);

    const driverAhead = raceData.raceData.lapData[
      raceData.raceData.currentLap === 0 ? 1 : raceData.raceData.currentLap - 1
    ].Timings.find((driver) => driver.position === positionAhead);

    if (driverAhead) {
      gapToAhead = (
        parseFloat(selectedDriverData[0]?.gapToFirst!) -
        parseFloat(driverAhead.gapToFirst!)
      ).toFixed(3); // Assuming you want to round to 3 decimal places
    }
  }

  let gainedPositions = "";

  if (selectedDriverData[0]?.position !== undefined) {
    const startingPositionData = raceData.raceData.lapData[0].Timings.find(
      (driver) => driver.driverId === selectedDriver
    )?.position;

    if (startingPositionData !== undefined) {
      gainedPositions = (
        Number(selectedDriverData[0]?.position) - Number(startingPositionData)
      ).toString();
    }
  }

  const driver = {
    position: selectedDriverData[0]?.position,
    firstName: finishResultData[0]?.Driver.givenName,
    lastName: finishResultData[0]?.Driver.familyName,
    lapTime: selectedDriverData[0]?.time,
    gapToLeader: selectedDriverData[0]?.gapToFirst,
    isRetired: selectedDriverData[0]?.isRetired,
    previousLapTime:
      raceData.raceData.currentLap > 1 &&
      raceData.raceData.lapData[
        raceData.raceData.currentLap === 0
          ? 1
          : raceData.raceData.currentLap - 2
      ].Timings.filter((driver) => driver.driverId === selectedDriver)[0]?.time,

    gapToAhead: gapToAhead,
    driverConstructor: finishResultData[0]?.Constructor.name,

    gainedPositions: gainedPositions,
    startingPosition: raceData.raceData.lapData[0]?.Timings.find(
      (driver) => driver.driverId === selectedDriver
    )?.position,
    permanentNumber: finishResultData[0]?.Driver.permanentNumber,
    color: constructorColors[finishResultData[0]?.Constructor.constructorId],
  };

  return driver;
};

export default useDriverInfo;
