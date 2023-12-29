"use client";

import { useAppSelector } from "@/lib/hooks";
import { Separator } from "./ui/separator";
import RacePlayControls from "./race-play-controls";
import { useEffect, useState } from "react";
import { countryFromShortName } from "@/lib/countries";
import Image from "next/image";
import RaceSelect from "./race-select";

const RaceTab = () => {
  const raceData = useAppSelector((state) => state.raceDataReducer);

  const [countryCode, setCountryCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (raceData.circuitInfo.location.country) {
      const countryShortName = countryFromShortName(
        raceData.circuitInfo.location.country!
      );
      setCountryCode(countryShortName.alpha_2_code);
    }
  }, [countryCode, raceData.circuitInfo.location.country]);

  // if (
  //   raceData.circuitInfo.location.country !== undefined &&
  //   countryCode === ""
  // ) {
  //   const code = countryFromShortName(raceData.circuitInfo.location.country!);

  //   setCountryCode(code.alpha_2_code);
  // }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid grid-cols-3">
        <div className="col-span-2 flex  justify-center flex-col">
          <div className="col-span-3 flex ">
            <Image
              src={"/f1_logo.png"}
              alt="F1 Logo"
              width={100}
              height={10}
              className=""
            />
            <h2 className="text-xl font-[900]">RACE</h2>
          </div>

          <div className="flex gap-x-2  mt-3">
            <span className="text-[10px] text-muted-foreground">
              {raceData.circuitInfo.circuitName}
            </span>
            <Separator orientation="vertical" />
            <span className="text-[10px] text-muted-foreground">
              {raceData.circuitInfo.location.country},{" "}
              {raceData.circuitInfo.location.locality}
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          {countryCode !== undefined && (
            <Image
              src={`https://flagcdn.com/h120/${countryCode.toLowerCase()}.png`}
              width={5000}
              onError={() => setCountryCode("US")}
              height={5000}
              className="w-auto h-[50px] object-contain"
              alt={`${raceData.circuitInfo.location.country}`}
            />
          )}
        </div>
      </div>

      <Separator className="my-1" />
      <div className="ml-auto">
        <RaceSelect isTransparent={true} />
      </div>
      <div className="flex flex-col items-center  rounded-md p-2 mt-12">
        <div className="flex items-center">
          <h2 className="text-xl  w-full text-center uppercase">
            {raceData.circuitInfo.raceName}
          </h2>
        </div>
        <div className="flex items-center gap-x-1 mb-3 justify-center col-span-2 mt-4">
          <span className="text-xs  mr-1">LAP</span>
          <span className="font-[900] text-3xl">
            {raceData.raceData.currentLap}
          </span>
          <span className="text-xs font-[900]">
            / {raceData.raceData.lapData.length}
          </span>
        </div>
      </div>

      <RacePlayControls />
    </div>
  );
};

export default RaceTab;
