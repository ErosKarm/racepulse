import RaceControls from "@/components/race-controls";
import { Separator } from "@/components/ui/separator";
import Header from "./_components.tsx/header";
import RaceGraph from "@/components/race-graph";

export default function Home() {
  return (
    <main className="flex min-h-screen max-h-screen flex-col px-6 lg:px-10 xl:px-24 py-8">
      <Header />

      <Separator className="mt-4" />

      <div className="grid grid-cols-1 h-screen mt-6 gap-10">
        <RaceControls />

        <div className="h-[auto] lg:h-[250px]">
          <RaceGraph />
        </div>
      </div>
    </main>
  );
}
