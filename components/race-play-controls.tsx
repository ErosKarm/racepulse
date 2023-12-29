"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Minus,
  Pause,
  Play,
  PlayIcon,
  Plus,
  SkipBack,
  SkipForward,
} from "lucide-react";

import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  setCurrentLap,
  setDecrementLap,
  setIncrementLap,
} from "@/lib/features/racedata/racedataslice";
import { useEffect, useState } from "react";
import { countryFromShortName } from "@/lib/countries";
import Image from "next/image";
import { Separator } from "./ui/separator";

const RacePlayControls = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const raceData = useAppSelector((state) => state.raceDataReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (
      isPlaying &&
      raceData.raceData.currentLap !== raceData.raceData.lapData.length - 1
    ) {
      interval = setInterval(() => {
        dispatch(setIncrementLap());
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    isPlaying,
    dispatch,
    raceData.raceData.currentLap,
    raceData.raceData.lapData,
  ]);

  return (
    <div className="flex flex-col h-full w-full mt-0">
      <div className="flex flex-col mt-8  gap-x-4  h-full w-full items-center"></div>

      <div className="mt-auto">
        <Progress
          className="h-2"
          value={
            (100 / raceData.raceData.lapData.length) *
            raceData.raceData.currentLap
          }
        />
        <div className="mt-5 w-full flex gap-x-3 align-center justify-center bg-stone-800/10 p-2 rounded-md shadow">
          <Button
            onClick={() => {
              dispatch(setCurrentLap(0));
            }}
            className="flex items-center justify-center  w-10 h-10"
            size={"icon"}
            variant={"ghost"}
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button
            variant={"ghost"}
            className="flex items-center justify-center  w-10 h-10"
            size={"icon"}
            onClick={() => {
              dispatch(setDecrementLap());
            }}
            disabled={raceData.raceData.currentLap === 0}
          >
            <Minus className="h-5 w-5" />
          </Button>
          <Button
            variant={"ghost"}
            disabled={
              raceData.raceData.currentLap === raceData.raceData.lapData.length
            }
            className="w-10 h-10 flex items-center justify-center   p-1.5 font-black"
            size={"icon"}
            onClick={() => setIsPlaying((prev) => !prev)}
          >
            {isPlaying ? (
              <Pause className="h-10 w-10" />
            ) : (
              <Play className="h-10 w-10 translate-x-0.5" />
            )}
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => dispatch(setIncrementLap())}
            disabled={
              raceData.raceData.currentLap === raceData.raceData.lapData.length
            }
            className="flex items-center justify-center  w-10 h-10"
            size={"icon"}
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => {
              dispatch(setCurrentLap(raceData.raceData.lapData.length));
            }}
            className="flex items-center justify-center  w-10 h-10"
            size={"icon"}
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RacePlayControls;
