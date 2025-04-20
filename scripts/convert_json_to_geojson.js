import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getClusterNum } from "../src/utils/getClusterNum.js";

// Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and parse rawData.json
const rawPath = path.join(__dirname, "../public/data/data.json");
const rawData = JSON.parse(fs.readFileSync(rawPath, "utf-8"));

function convertToGeoJSON(data) {
  const features = data
    .filter(
      (crash) =>
        typeof crash.LONGITUDNAME === "number" &&
        typeof crash.LATITUDENAME === "number"
    )
    .map((crash) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [crash.LONGITUDNAME, crash.LATITUDENAME],
      },
      properties: {
        ...crash,
        CLUSTERNUM: getClusterNum(crash),
      },
    }));

  return {
    type: "FeatureCollection",
    features,
  };
}

const geoJsonData = convertToGeoJSON(rawData);

// Save to geoData.json
const outPath = path.join(__dirname, "../public/data/geoData.json");
fs.writeFileSync(outPath, JSON.stringify(geoJsonData, null, 2), "utf-8");

console.log("✅ GeoJSON file saved as geoData.json");
