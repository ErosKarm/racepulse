"use client";

import { useAppSelector } from "@/lib/hooks";
import RaceSelect from "./race-select";
import { Button } from "./ui/button";
import RaceTab from "./race-tab";
import DriverInformation from "./driver-information";

const RaceControls = () => {
  const raceData = useAppSelector((state) => state.raceDataReducer);

  return (
    <div className="grid grid-cols-3 gap-x-8 h-[450px]">
      <DriverInformation />

      <div className=" border border-t-0 p-6 ">
        {raceData.raceData.lapData.length === 0 && <RaceSelect />}

        {raceData.raceData.lapData.length !== 0 && <RaceTab />}
      </div>
      <DriverInformation />
    </div>
  );
};

export default RaceControls;
