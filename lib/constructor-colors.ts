/**
 * Manually went through and assigned colors to the teams based off of their liveries
 * Credit: Wikipedia, https://www.reddit.com/r/formula1/comments/lfpyfp/f1_2021_team_colors_hex_codes/
 * Credit: https://github.com/yannickgloster/f1-lap-visualizer/blob/main/helpers/constructorColors.js yannickgloster
 * @type {{[key: string]: string}}
 * @see https://www.reddit.com/r/formula1/comments/lfpyfp/f1_2021_team_colors_hex_codes/
 * @see https://github.com/yannickgloster/f1-lap-visualizer/blob/main/helpers/constructorColors.js
 * @see https://www.reddit.com/r/formula1/comments/lfpyfp/f1_2021_team_colors_hex_codes/
 *
 */

interface ConstructorColors {
  [key: string]: string;
}

const constructorColors: ConstructorColors = {
  benetton: "#008860",
  ferrari: "#ed1c24",
  footwork: "#FFFFFF",
  forti: "#fae898",
  jordan: "#FFFF00",
  ligier: "#193364",
  mclaren: "#FF8000",
  minardi: "#000000",
  sauber: "#DF2D21",
  tyrrell: "#204774",
  williams: "#005AFF",
  arrows: "#FFFFFF",
  lola: "#FF5F00",
  prost: "#051772",
  stewart: "#d3d3d3", // Conflicting color with footwork/arrows, originally was #FFFFFF
  bar: "#BC0730",
  jaguar: "#02571B",
  renault: "#FFF500",
  toyota: "#D83E4B",
  red_bull: "#0600EF",
  bmw_sauber: "#031e49",
  honda: "#CD0000",
  mf1: "#FF0000",
  spyker_mf1: "#FF8B41",
  super_aguri: "#E30008",
  toro_rosso: "#469BFF",
  spyker: "#FF8B41",
  force_india: "#F596C8",
  brawn: "#B8FD6E",
  hrt: "#A6904F",
  lotus_racing: "#FFB800",
  mercedes: "#00D2BE",
  virgin: "#F43730",
  caterham: "#033319",
  lotus_f1: "#FFB800",
  marussia: "#DB1922",
  manor: "#DB1922",
  haas: "#FFFFFF",
  alfa: "#900000",
  racing_point: "#F363B9",
  alphatauri: "#2B4562",
  alpine: "#0090FF",
  aston_martin: "#006F62",
};

export default constructorColors;
