import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center">
      <Image
        src={"/f1_logo.png"}
        alt="F1 Logo"
        width={150}
        height={150}
        className="grayscale invert brightness-50"
      />

      <h1 className="text-2xl ml-2 font-semibold">
        Racepulse | F1 Race Visualizer
      </h1>

      <Link
        href="https://ergast.com/mrd/"
        className="ml-2 text-sm text-muted-foreground hover:underline hover:text-red-500"
      >
        - powered by ErgastAPI
      </Link>
    </div>
  );
};

export default Header;
