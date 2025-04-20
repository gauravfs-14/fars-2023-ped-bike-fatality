export function getClusterNum(props) {
  let cluster;

  // Cluster 0: School Zone / Children Related
  if (
    (props.PBSZONENAME && props.PBSZONENAME !== "None Noted") ||
    (props.PEDCTYPENAME &&
      props.PEDCTYPENAME.match(/School Bus|Play|Dash|Dart|Youth/i))
  ) {
    cluster = 0;
    props.CLUSTERNUM = 0;
  }

  // Cluster 1: Poor Visibility or Bad Weather
  else if (
    ["Dusk", "Dawn", "Dark - Lighted", "Dark - Not Lighted"].includes(
      props.LGT_CONDNAME
    ) ||
    [
      "Fog, Smog, Smoke",
      "Rain",
      "Sleet or Hail",
      "Snow",
      "Freezing Rain or Drizzle",
    ].includes(props.WEATHERNAME)
  ) {
    cluster = 1;
    props.CLUSTERNUM = 1;
  }

  // Cluster 2: Legal Walking Areas (Crosswalks, Sidewalks, Shoulders)
  else if (
    props.PEDPOSNAME &&
    props.PEDPOSNAME.match(/Crosswalk|Sidewalk|Shoulder/i)
  ) {
    cluster = 2;
    props.CLUSTERNUM = 2;
  }

  // Cluster 3: High-Speed Roadways (Freeways, Arterials)
  else if (
    props.FUNC_SYSNAME &&
    props.FUNC_SYSNAME.match(/Interstate|Freeway|Principal Arterial/i)
  ) {
    cluster = 3;
    props.CLUSTERNUM = 3;
  }

  // Cluster 4: Rural Area Crashes
  else if (
    ["Rural", "Trafficway Not in State Inventory"].includes(props.RUR_URBNAME)
  ) {
    cluster = 4;
    props.CLUSTERNUM = 4;
  }

  // Cluster 5: Miscellaneous / Catch-All
  else {
    cluster = 5;
    props.CLUSTERNUM = 5;
  }
  return cluster;
}
