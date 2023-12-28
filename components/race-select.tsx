"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import RaceSelectForm from "@/app/_components.tsx/race-select-form";

const RaceSelect = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-[#111111] text-white  px-6 mb-4 rounded-md items-center flex gap-2 text-xs  py-3 font-semibold">
          SELECT RACE <Plus className="w-4 h-4" />
        </DialogTrigger>
        <DialogContent className="bg-[#101018]/95">
          <DialogHeader>
            <Image
              src={"/f1_logo.png"}
              width={50}
              height={50}
              alt="logo"
              className="mb-4"
            />

            <DialogTitle>Select a race, you want to display:</DialogTitle>

            <RaceSelectForm setOpen={setOpen} />
          </DialogHeader>

          <DialogFooter className="">
            <DialogDescription className="text-[11px] pt-4">
              <b>NOTE:</b> Only races from 1996 onwards are available.
            </DialogDescription>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <span className="text-xs text-muted-foreground">
        Select a race you want to display.
      </span>
    </div>
  );
};

export default RaceSelect;
