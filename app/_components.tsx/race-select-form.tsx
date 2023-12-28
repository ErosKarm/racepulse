"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { fetchRaceData, fetchRaceResult } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

import {
  setCircuitInfo,
  setFinishingResult,
  setLapData,
} from "@/lib/features/racedata/racedataslice";
import { useAppDispatch } from "@/lib/hooks";

interface RaceSelectFormProps {
  setOpen: (value: boolean) => void;
}

const formSchema = z.object({
  year: z.string().min(4, {
    message: "Please select a year.",
  }),

  circuit: z.string().min(1, {
    message: "Please select a circuit.",
  }),
});

const RaceSelectForm = ({ setOpen }: RaceSelectFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [year, setYear] = useState<string>("2023");
  const [circuits, setCircuits] = useState([]);
  const [raceData, setRaceData] = useState([]);

  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: "2023",
      circuit: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const lapData = await fetchRaceData(values.year, values.circuit);

      dispatch(setLapData(lapData));

      const raceResultData = await fetchRaceResult(values.year, values.circuit);

      const circuitInfo = {
        date: raceResultData.MRData.RaceTable.Races[0].date,
        raceName: raceResultData.MRData.RaceTable.Races[0].raceName,
        round: raceResultData.MRData.RaceTable.Races[0].round,
        season: raceResultData.MRData.RaceTable.Races[0].season,
        time: raceResultData.MRData.RaceTable.Races[0].time,
        circuitName:
          raceResultData.MRData.RaceTable.Races[0].Circuit.circuitName,
        location: {
          lat: raceResultData.MRData.RaceTable.Races[0].Circuit.Location.lat,
          long: raceResultData.MRData.RaceTable.Races[0].Circuit.Location.long,
          locality:
            raceResultData.MRData.RaceTable.Races[0].Circuit.Location.locality,
          country:
            raceResultData.MRData.RaceTable.Races[0].Circuit.Location.country,
        },
      };

      dispatch(setCircuitInfo(circuitInfo));

      dispatch(
        setFinishingResult(raceResultData.MRData.RaceTable.Races[0].Results)
      );

      toast({
        action: (
          <div className="w-full flex items-center ">
            <CheckIcon className="mr-2 " />
            <span className="first-letter:capitalize text-sm">
              Data fetched successfully!
            </span>
          </div>
        ),
      });

      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });

      console.log("error fetching data", error);
    } finally {
    }
  }

  useEffect(() => {
    const fetchCircuits = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://ergast.com/api/f1/${year}.json`);
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();

        setCircuits(data.MRData.RaceTable.Races);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCircuits();
  }, [year]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-4 pt-4"
      >
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a year</FormLabel>

              <Select
                disabled={isLoading}
                onValueChange={(value) => {
                  field.onChange(value);
                  setYear(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-[#101018]/95">
                    <SelectValue placeholder="Select a year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="text-xs bg-[#101018]">
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2019">2019</SelectItem>
                  <SelectItem value="2018">2018</SelectItem>
                  <SelectItem value="2017">2017</SelectItem>
                  <SelectItem value="2016">2016</SelectItem>
                  <SelectItem value="2015">2015</SelectItem>
                  <SelectItem value="2014">2014</SelectItem>
                  <SelectItem value="2013">2013</SelectItem>
                  <SelectItem value="2012">2012</SelectItem>
                  <SelectItem value="2011">2011</SelectItem>
                  <SelectItem value="2010">2010</SelectItem>
                  <SelectItem value="2009">2009</SelectItem>
                  <SelectItem value="2008">2008</SelectItem>
                  <SelectItem value="2007">2007</SelectItem>
                  <SelectItem value="2006">2006</SelectItem>
                  <SelectItem value="2005">2005</SelectItem>
                  <SelectItem value="2004">2004</SelectItem>
                  <SelectItem value="2003">2003</SelectItem>
                  <SelectItem value="2002">2002</SelectItem>
                  <SelectItem value="2001">2001</SelectItem>
                  <SelectItem value="2000">2000</SelectItem>
                  <SelectItem value="1999">1999</SelectItem>
                  <SelectItem value="1998">1998</SelectItem>
                  <SelectItem value="1997">1997</SelectItem>
                  <SelectItem value="1996">1996</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="circuit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a circuit</FormLabel>

              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-[#101018]/95">
                    <SelectValue placeholder="Select a circuit" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent className="bg-[#101018]">
                  {circuits
                    ? circuits.map((circuit: any) => (
                        <SelectItem key={circuit.round} value={circuit.round}>
                          {circuit.raceName}
                        </SelectItem>
                      ))
                    : null}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button
          className="mt-4 col-span-2"
          size={"sm"}
          disabled={isLoading}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RaceSelectForm;
