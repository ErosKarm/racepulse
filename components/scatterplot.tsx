"use client";

import { useCallback, useEffect, useMemo } from "react";
import * as d3 from "d3";
import { useAppSelector } from "@/lib/hooks";
import constructorColors from "@/lib/constructor-colors";

interface TimingsData {
  driverId: string;
  gapToFirst?: string;
  isRetired?: boolean;
  position: string;
  time: string;
}

interface ScatterPlotProps {
  lapData: TimingsData[];
}

const ScatterPlot = ({ lapData }: ScatterPlotProps) => {
  const raceData = useAppSelector((state) => state.raceDataReducer);

  // Define the useMemo outside of the component function
  const shortenNameMemo = useMemo(() => {
    return (fullName: string): string => {
      // Step 1: Remove everything before '_' if it exists
      const lastName = fullName.includes("_")
        ? fullName.split("_")[1]
        : fullName;

      // Step 2: Take the first 3 letters, make them uppercase
      const shortened = lastName.slice(0, 3).toUpperCase();

      return shortened;
    };
  }, []); // Empty dependency array, meaning it only runs once during the initial render

  const createScatterPlot = useCallback(
    (lapData: TimingsData[]) => {
      const containerWidth =
        document.getElementById("scatter-plot-container")?.offsetWidth || 1100;
      const margin = { top: 20, right: 60, bottom: 60, left: 60 };
      const width = containerWidth - margin.left - margin.right;
      const height = 170 - margin.top - margin.bottom;
      // Filter out entries where gapToFirst is not a number and position is not "RETIRED"
      const filteredLapData = lapData.filter(
        (d) =>
          typeof d.gapToFirst === "string" &&
          !isNaN(Number(d.gapToFirst)) &&
          d.position !== "RETIRED" &&
          !d.isRetired &&
          d.gapToFirst !== null
      );

      // Create scales
      const xScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(filteredLapData, (d) => parseFloat(d.gapToFirst as string)) ||
            0,
        ])
        .range([0, width]);

      // const xScale = d3.scaleLinear().domain([0]).range([0, width]);

      // Select the existing SVG container and remove its children
      const prevSvg = d3.select("#scatter-plot-container");
      prevSvg.selectAll("*").remove();

      // Create SVG container
      const svg = d3
        .select("#scatter-plot-container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Create circles for drivers
      svg
        .selectAll(".circle")
        .data(filteredLapData)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("cx", (d) => xScale(parseFloat(d.gapToFirst as string))) // Change gap to gapToFirst
        .attr("cy", height / 2) // Adjust as needed
        .attr("r", 26) // Increase the radius as needed
        .style("fill", (d) => {
          const finishResultData = raceData.finishResult.filter((driver) => {
            return driver.Driver.driverId === d.driverId;
          });

          return constructorColors[
            finishResultData[0]?.Constructor.constructorId
          ];
        });

      // Add labels for driverId
      svg
        .selectAll(".label")
        .data(filteredLapData)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d) => xScale(parseFloat(d.gapToFirst as string))) // Change gap to gapToFirst
        .attr("y", height / 2) // Adjust as needed
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .style("fill", "#c4c4c4") // Set text color to white
        .style("font-size", "11px") // Adjust font size as needed
        .text((d) => {
          return shortenNameMemo(d.driverId);
        })
        .style("font-weight", "bold");

      // Add x-axis for seconds
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(
          d3.axisBottom(xScale).tickFormat((d) => `+${Number(d).toFixed(3)}s`)
        );
    },
    [raceData.finishResult, shortenNameMemo]
  );

  useEffect(() => {
    const handleResize = () => {
      const containerWidth =
        document.getElementById("scatter-plot-container")?.offsetWidth || 1100;
      createScatterPlot(lapData);
    };

    handleResize(); // Initial call to set the chart size

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [lapData, raceData.finishResult, shortenNameMemo, createScatterPlot]);

  if (lapData) {
    createScatterPlot(lapData);
  } else {
    console.log("No data available");
  }

  return (
    <div
      id="scatter-plot-container"
      className="h-full w-full flex items-center"
    ></div>
  );
};

export default ScatterPlot;
