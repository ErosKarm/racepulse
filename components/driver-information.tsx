"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "./ui/separator";
import { useState } from "react";
import DriverSelect from "./driver-select";

import { useAppSelector } from "@/lib/hooks";
import useDriverInfo from "@/lib/hooks/useDriverInfo";
import DriverInformationTab from "./driver-information-tab";
import { cn } from "@/lib/utils";

const DriverInformation = () => {
  const raceData = useAppSelector((state) => state.raceDataReducer);
  const [selectedDriver, setSelectedDriver] = useState<string | undefined>(
    undefined
  );
  const driverInfo = useDriverInfo(selectedDriver, raceData);

  return (
    <div
      className={cn(
        "h-fit relative",
        raceData.raceData.lapData.length === 0 ? "blur-sm" : ""
      )}
    >
      <DriverSelect setSelectedDriver={setSelectedDriver} />

      <div
        className={cn(
          "absolute top-1/4  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-[#101018] shadow-md border  rounded-md p-2 px-8 text-xs",
          selectedDriver !== undefined && raceData.raceData.currentLap !== 0
            ? "hidden"
            : ""
        )}
      >
        {selectedDriver === undefined
          ? `Select a driver  to see more info.`
          : ""}
        {raceData.raceData.currentLap === 0
          ? "Start the race to see data."
          : ""}
      </div>

      <div
        className={cn(
          "",
          selectedDriver === undefined ? "blur-sm" : "",
          raceData.raceData.currentLap === 0 ? "blur-sm" : ""
        )}
      >
        <div className={cn("grid grid-cols-3 items-center mt-4")}>
          <span className="text-xs text-muted-foreground">POSITION</span>
          <span className="text-xs text-muted-foreground col-span-1">
            DRIVER
          </span>

          <div
            style={{
              borderColor: `${driverInfo?.color}`,
              backgroundColor: `${driverInfo?.color}1A`,
            }}
            className={cn(
              "h-24 col-span-3 grid grid-cols-3 mt-2  border-l-[3px]"
            )}
          >
            <div className="flex items-center  ">
              <span className="text-4xl pl-6">{driverInfo?.position}</span>
            </div>
            <div className="flex  flex-col justify-center col-span-2">
              <span className="text-xl uppercase">{driverInfo?.firstName}</span>
              <span
                style={{
                  color: `${driverInfo.color}`,
                }}
                className="text-3xl uppercase text-red-500 font-semibold"
              >
                {driverInfo?.lastName}
              </span>
              <span className="text-xs text-muted-foreground">
                {driverInfo.driverConstructor}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-4">
          <div className="flex flex-col border-r-2">
            <span className="text-xs text-muted-foreground">LAP TIME</span>
            <span className="text-3xl font-semibold">{driverInfo.lapTime}</span>
          </div>
          <div className="flex flex-col pl-8">
            <span className="text-xs text-muted-foreground">GAP TO LEADER</span>
            <span className="text-3xl font-semibold">
              -{driverInfo.gapToLeader}s
            </span>
          </div>
        </div>
        <Separator className="mt-4" />
        <div className="grid grid-cols-3 mt-4">
          <div className="flex flex-col justify-between border-r-2">
            <span className="text-xs text-muted-foreground">PREVIOUS LAP</span>
            <span className="text-md ">
              {driverInfo.previousLapTime ? driverInfo.previousLapTime : "-"}
            </span>
          </div>
          <div className="flex flex-col justify-between pl-8 border-r-2">
            <span className="text-xs text-muted-foreground">GAP AHEAD</span>
            <span className="text-md ">
              {driverInfo.gapToAhead === null
                ? "-"
                : `+${driverInfo.gapToAhead}s `}
            </span>
          </div>
          <div className="flex flex-col justify-between pl-8 ">
            <span className="text-xs text-muted-foreground">CONSTRUCTOR</span>
            <span className="text-xs">{driverInfo.driverConstructor}</span>
          </div>
        </div>

        <Separator className="mt-4" />
        <div className="grid grid-cols-3 mt-4">
          <div className="flex flex-col justify-between border-r-2">
            <span className="text-xs text-muted-foreground">STARTING POS.</span>
            <span className="text-md ">P{driverInfo.startingPosition}</span>
          </div>
          <div className="flex flex-col justify-between pl-8 border-r-2">
            <span className="text-xs text-muted-foreground">CURRENT POS.</span>
            <span className="text-md ">P{driverInfo.position}</span>
          </div>
          <div className="flex flex-col justify-between pl-8 ">
            <span className="text-xs text-muted-foreground">GAINED POS.</span>
            <span className="text-md flex items-center">
              {Number(driverInfo.gainedPositions) > 0 ? (
                <>
                  +{driverInfo.gainedPositions}
                  <ChevronDown className="text-red-500 w-5 h-5" />
                </>
              ) : (
                <>
                  {driverInfo.gainedPositions}
                  <ChevronUp className="text-green-500 w-5 h-5" />
                </>
              )}
            </span>
          </div>
        </div>

        <Separator className="mt-4" />
        {/* <div className="mt-4">
      <h4>Driver information</h4>
      <div className="grid grid-cols-2 mt-2">
      <div className="flex flex-col border-r">
      <span className="text-xs text-muted-foreground">NATIONALITY</span>
      <span className="text-xs ">Monaco</span>
        </div>
        <div className="flex flex-col  pl-8">
        <span className="text-xs text-muted-foreground">
        PERMANENT NUMBER
        </span>
        <span className="text-xs">8</span>
        </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 mt-2">
        <div className="flex flex-col border-r">
        <span className="text-xs text-muted-foreground">
        CHAMPIONSHIP POSITION
        </span>
        <span className="text-xs ">P2</span>
        </div>
        <div className="flex flex-col  pl-8">
        <span className="text-xs text-muted-foreground">
        CHAMPIONSHIP POINTS
        </span>
        <span className="text-xs">321</span>
        </div>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default DriverInformation;
