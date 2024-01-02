"use client";

import { useAppSelector } from "@/lib/hooks";
import RaceSelect from "./race-select";
import { Button } from "./ui/button";
import RaceTab from "./race-tab";
import DriverInformation from "./driver-information";

const RaceControls = () => {
  const raceData = useAppSelector((state) => state.raceDataReducer);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-8 h-[auto] xl:h-[450px]">
      <div className="xl:block hidden">
        <DriverInformation />
      </div>

      <div className="col-span-2 xl:col-span-1 border border-t-0 p-6 ">
        {raceData.raceData.lapData.length === 0 && <RaceSelect />}

        {raceData.raceData.lapData.length !== 0 && <RaceTab />}
      </div>
      <div className="xl:block hidden">
        <DriverInformation />
      </div>

      <div className="xl:hidden grid grid-cols-2 gap-x-8 col-span-2 mt-8">
        <div className="col-span-2 md:col-span-1">
          <DriverInformation />
        </div>
        <div className="col-span-2 md:col-span-1 md:mt-0 mt-8">
          <DriverInformation />
        </div>
      </div>
    </div>
  );
};

export default RaceControls;
