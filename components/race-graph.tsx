"use client";

import { useAppSelector } from "@/lib/hooks";
import ScatterPlot from "./scatterplot";
import FinishTable from "./finish-table";
import { ScrollArea } from "./ui/scroll-area";

const RaceGraph = () => {
  const raceData = useAppSelector((state) => state.raceDataReducer);

  console.log(raceData.raceData.lapData, "LAPDATA");
  console.log(raceData.raceData.currentLap, "CURRENT LAP");

  if (raceData.raceData.lapData.length === 0) {
    return;
  }

  return (
    <div className="h-full w-full  flex items-center justify-center  align-center shadow-xl bg-stone-900/10">
      {raceData.raceData.currentLap === 0 && (
        <div className="">Race has not started</div>
      )}

      {raceData.raceData.currentLap > 0 &&
        raceData.raceData.currentLap !== raceData.raceData.lapData.length && (
          <ScatterPlot
            lapData={
              raceData.raceData.lapData[raceData.raceData.currentLap - 1]
                .Timings
            }
          />
        )}

      {raceData.raceData.currentLap === raceData.raceData.lapData.length && (
        <ScrollArea className="w-full h-[250px] px-10 py-4">
          <FinishTable />
        </ScrollArea>
      )}
    </div>
  );
};

export default RaceGraph;
