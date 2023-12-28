import { useAppSelector } from "@/lib/hooks";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import constructorColors from "@/lib/constructor-colors";

const FinishTable = () => {
  const raceData = useAppSelector((state) => state.raceDataReducer);

  console.log(raceData.finishResult);

  return (
    <Table className="p-4">
      <TableHeader>
        <TableRow className="text-xs font-bold">
          <TableHead className="text-white font-semibold">POS</TableHead>
          <TableHead className="text-white font-semibold">NO</TableHead>
          <TableHead className="text-white font-semibold">DRIVER</TableHead>
          <TableHead className="text-white font-semibold">CAR</TableHead>
          <TableHead className="text-white font-semibold">LAPS</TableHead>
          <TableHead className="text-white font-semibold">
            TIME/RETIRED
          </TableHead>
          <TableHead className="text-white font-semibold">PTS</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {raceData.finishResult.map((result) => (
          <TableRow key={result.position} className="text-xs">
            <TableHead className="text-sm font-semibold text-white">
              {result.position}
            </TableHead>
            <TableHead
              className="text-lg font-semibold"
              style={{
                color:
                  constructorColors[
                    result.Constructor.constructorId.toLowerCase()
                  ],
              }}
            >
              {result.Driver.permanentNumber}
            </TableHead>
            <TableHead className="text-white">
              {result.Driver.givenName} {result.Driver.familyName}
            </TableHead>
            <TableHead className="uppercase text-white">
              {result.Constructor.name}
            </TableHead>
            <TableHead className="text-white">{result.laps}</TableHead>
            <TableHead className="text-white">
              {result.Time ? result.Time.time : result.status}
            </TableHead>
            <TableHead className="text-white">{result.points}</TableHead>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FinishTable;
