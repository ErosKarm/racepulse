import DriverInformation from "@/components/driver-information";
import RaceControls from "@/components/race-controls";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import Header from "./_components.tsx/header";
import { useAppSelector } from "@/lib/hooks";
import RaceGraph from "@/components/race-graph";

export default function Home() {
  return (
    <main className="flex min-h-screen max-h-screen flex-col  px-24 py-8">
      <Header />

      <Separator className="mt-6" />

      <div className="grid grid-cols-1 h-screen mt-6 gap-10">
        <RaceControls />

        <div className="h-[250px]">
          <RaceGraph />
        </div>
      </div>
    </main>
  );
}
