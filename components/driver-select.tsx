"use client";

import { useAppSelector } from "@/lib/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import constructorColors from "@/lib/constructor-colors";
import { cn } from "@/lib/utils";

interface DriverSelectProps {
  setSelectedDriver: (driverId: string) => void;
}

const DriverSelect = ({ setSelectedDriver }: DriverSelectProps) => {
  const raceData = useAppSelector((state) => state.raceDataReducer);

  return (
    <Select
      onValueChange={(value) => {
        setSelectedDriver(value);
      }}
    >
      <SelectTrigger className="w-full gap-x-10 text-xs bg-transparent h-12">
        <SelectValue
          className="text-xs text-muted-foreground"
          placeholder="Select Driver"
        />
      </SelectTrigger>
      <SelectContent className="text-xs bg-[#101018]/95">
        {raceData.finishResult?.map((driver: any) => {
          return (
            <SelectItem
              key={driver.Driver.driverId}
              value={driver.Driver.driverId}
            >
              <div className="flex flex-col w-full justify-between">
                <div className="flex items-center gap-x-2">
                  <div
                    style={{
                      color:
                        constructorColors[
                          driver.Constructor.constructorId.toLowerCase()
                        ],
                    }}
                    className={cn("font-semibold text-xl w-[30px] ")}
                  >
                    {driver.Driver.permanentNumber}
                  </div>

                  <div className="w-[40px] ">{driver.Driver.code}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {driver.Driver.givenName} {driver.Driver.familyName}
                </div>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default DriverSelect;
