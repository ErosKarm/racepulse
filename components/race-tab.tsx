import { useAppSelector } from "@/lib/hooks";
import { Separator } from "./ui/separator";
import RacePlayControls from "./race-play-controls";

const RaceTab = () => {
  const raceData = useAppSelector((state) => state.raceDataReducer);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold w-full text-center">
          {raceData.circuitInfo.raceName}
        </h2>
      </div>
      <Separator className="my-2" />
      <div className="flex gap-x-2 align-center justify-center">
        <span className="text-xs text-muted-foreground">
          Race nr: {raceData.circuitInfo.round}
        </span>
        <Separator orientation="vertical" />
        <span className="text-xs text-muted-foreground">
          {raceData.circuitInfo.circuitName}
        </span>
        <Separator orientation="vertical" />
        <span className="text-xs text-muted-foreground">
          {raceData.circuitInfo.location.country}
        </span>
      </div>

      <div className="flex gap-x-2 align-center mt-1 justify-center">
        <span className="text-xs text-muted-foreground">
          Date: {raceData.circuitInfo.date}
        </span>
        <Separator orientation="vertical" />
        <span className="text-xs text-muted-foreground">
          Season: {raceData.circuitInfo.season}
        </span>
      </div>

      <RacePlayControls />
    </div>
  );
};

export default RaceTab;
