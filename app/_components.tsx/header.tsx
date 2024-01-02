import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="flex flex-col xl:flex-row items-center justify-between">
        <div className="flex items-center md:flex-row flex-col">
          <Image
            src={"/f1_logo.png"}
            alt="F1 Logo"
            width={150}
            height={150}
            className="grayscale invert brightness-50 2xl:w-[150px] w-[100px]"
          />

          <h1 className="2xl:text-2xl text-xl ml-2 font-semibold md:text-left text-center md:mt-0 mt-4">
            Racepulse | F1 Race Visualizer
          </h1>

          <Link
            href="https://ergast.com/mrd/"
            className="ml-2 2xl:text-sm text-xs text-muted-foreground hover:underline text-blue-400"
          >
            - powered by ErgastAPI
          </Link>
        </div>

        <div className="flex items-center gap-x-3 xl:gap-x-0  flex-col xl:mt-0  md:mt-0 mt-4">
          <div className="flex xl:justify-end xl:w-full w-auto  gap-x-4">
            <Link
              href={"https://github.com/ErosKarm?tab=repositories"}
              className="text-muted-foreground xl:text-[11px] text-[10px] flex gap-x-2 items-center text-blue-400 hover:underline "
            >
              Built by - Eros Karm: Source Code
              <GithubIcon className="xl:w-5 xl:h-5 h-4 w-4" />
            </Link>
          </div>

          <div className="flex md:text-left text-center items-center justify-end text-[10px] text-muted-foreground xl:mt-2 mt-0">
            Discouraged: Strange behavior may occur when viewing on mobile
            devices.
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
