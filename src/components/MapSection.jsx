import { useEffect, useRef, useMemo, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Scrollama, Step } from "react-scrollama";

const MapSection = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const geoJsonLayerRef = useRef(null);

  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch(
      "https://zlyp6b2wyu34rqw4.public.blob.vercel-storage.com/geoData-xrAxBoCKwlqQ2qcThRClJjEUgC5LR3.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid content type. Expected JSON.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("GeoJSON data loaded");
        setGeoJsonData(data);
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  useEffect(() => {
    if (map.current || !geoJsonData) return; // initialize map only once and when geoJsonData is ready

    console.log("Initializing map...");
    map.current = L.map(mapContainer.current, {
      scrollWheelZoom: false, // Disable scroll wheel zoom
    }).setView([40.0902, -80.7129], 4.5); // Center of contiguous US (mainland) with appropriate zoom level

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(map.current);

    const canvasRenderer = L.canvas({ padding: 0.5 });

    console.log("Adding GeoJSON layer...");
    geoJsonLayerRef.current = L.geoJSON(geoJsonData, {
      pointToLayer: (feature, latlng) => {
        let color;
        const props = feature.properties;
        let cluster = feature.properties.CLUSTERNUM;

        // 🎨 Assign color based on cluster
        switch (cluster) {
          case 0:
            color = "#77fa3f"; // School zone/children
            break;
          case 1:
            color = "#fba840"; // Poor visibility/weather
            break;
          case 2:
            color = "#ae1b45"; // Legal pedestrian area
            break;
          case 3:
            color = "#3ad4d6"; // High-speed roads
            break;
          case 4:
            color = "#02477e"; // Rural
            break;
          default:
            color = "#999999"; // Shouldn't happen now
            break;
        }

        const marker = L.circleMarker(latlng, {
          radius: 5,
          fillColor: color,
          color: color,
          weight: 1,
          opacity: 1,
          fillOpacity: 0.4,
          renderer: canvasRenderer,
        });

        // Create popup content with all properties
        const popupContent = `
              <div style="max-height: 200px; overflow-y: auto; z-index: 1000;">
                <h4 style="margin: 0 0 8px 0;">Crash Details</h4>
                
                <strong>CRASH ID:</strong> ${props.CRASH_NUM1}<br/>
                <strong>CLUSTER:</strong> ${props.CLUSTERNUM}<br/>
                <strong>STATE:</strong> ${props.STATENAME} (${props.STATE})<br/>
                <strong>CASE NUMBER:</strong> ${props.ST_CASE}<br/>
                <strong>YEAR:</strong> ${props.YEAR}<br/>
                
                <strong>DATE:</strong> ${props.MONTHNAME} ${props.DAY}, ${props.YEAR}<br/>
                <strong>DAY OF WEEK:</strong> ${props.DAY_WEEKNAME}<br/>
                <strong>TIME:</strong> ${props.HOURNAME} (${props.HOUR}:00)<br/>

                <strong>CITY:</strong> ${props.CITYNAME}<br/>
                <strong>COUNTY:</strong> ${props.COUNTYNAME}<br/>
                <strong>LATITUDE:</strong> ${props.LATITUDENAME}<br/>
                <strong>LONGITUDE:</strong> ${props.LONGITUDNAME}<br/>

                <strong>ROAD FUNCTION CLASS:</strong> ${props.FUNC_SYSNAME}<br/>
                <strong>RURAL/URBAN:</strong> ${props.RUR_URBNAME}<br/>

                <strong>WEATHER:</strong> ${props.WEATHERNAME}<br/>
                <strong>LIGHTING:</strong> ${props.LGT_CONDNAME}<br/>
                <strong>SCHOOL BUS INVOLVED:</strong> ${props.SCH_BUSNAME}<br/>

                <hr style="margin: 8px 0;" />

                <strong>PERSON INVOLVED:</strong><br/>
                - Type: ${props.PBPTYPENAME}<br/>
                - Age: ${props.PBAGE} (${props.PBAGENAME})<br/>
                - Sex: ${props.PBSEXNAME}<br/>

                <strong>Crosswalk Use:</strong> ${props.PBCWALKNAME}<br/>
                <strong>Sidewalk Use:</strong> ${props.PBSWALKNAME}<br/>
                <strong>School Zone:</strong> ${props.PBSZONENAME}<br/>

                <strong>Pedestrian Location:</strong> ${props.PEDLOCNAME}<br/>
                <strong>Pedestrian Position:</strong> ${props.PEDPOSNAME}<br/>
                <strong>Pedestrian Direction:</strong> ${props.PEDDIRNAME}<br/>
                <strong>Pedestrian Circumstance:</strong> ${props.PEDCTYPENAME}<br/>
                <strong>Pedestrian Grouping:</strong> ${props.PEDCGPNAME}<br/>
                <strong>Pedestrian Leg Movement:</strong> ${props.PEDLEGNAME}<br/>
                <strong>Pedestrian Signal Relation:</strong> ${props.PEDSNRNAME}<br/>

                <hr style="margin: 8px 0;" />

                <strong>Bicycle Info:</strong><br/>
                - Cyclist Type: ${props.BIKECTYPENAME}<br/>
                - Cyclist Location: ${props.BIKELOCNAME}<br/>
                - Cyclist Position: ${props.BIKEPOSNAME}<br/>
                - Cyclist Direction: ${props.BIKEDIRNAME}<br/>
                - Cyclist Grouping: ${props.BIKECGPNAME}<br/>

                <hr style="margin: 8px 0;" />

                <strong>Crash Details:</strong><br/>
                - First Harmful Event: ${props.HARM_EVNAME}<br/>
                - Manner of Collision: ${props.MAN_COLLNAME}<br/>
                - Motor Direction: ${props.MOTDIRNAME}<br/>
                - Motor Maneuver: ${props.MOTMANNAME}<br/>
              </div>
`;
        marker.on("click", () => {
          marker
            .bindPopup(popupContent, {
              maxWidth: 300,
              maxHeight: 250,
              autoPan: true,
              closeButton: true,
              autoPanPadding: [50, 50],
            })
            .openPopup();
        });

        return marker;
      },
    }).addTo(map.current);

    map.current.geoJsonLayer = geoJsonLayerRef.current;
    console.log("GeoJSON layer added.");
  }, [geoJsonData]);

  const filteredFeaturesByCluster = useMemo(() => {
    if (!geoJsonData || !geoJsonData.features) return {}; // Add null check

    const clusters = {};
    for (let i = 0; i <= 5; i++) {
      clusters[i] = geoJsonData.features.filter(
        (feature) => feature.properties.CLUSTERNUM === i
      );
    }
    return clusters;
  }, [geoJsonData]);

  const onStepEnter = ({ data }) => {
    // Handle map updates based on scroll position
    console.log("Step entered:", data);
    const geoJsonLayer = map.current?.geoJsonLayer;
    if (!geoJsonLayer || !geoJsonData) return;

    if (data === "allScene") {
      // geoJsonLayerRef.current.clearLayers(); // Remove points before flying
      map.current.flyTo([40.0902, -80.7129], 4.5); // Use flyTo for animation
      // map.current.once("moveend", () => {
      //   geoJsonLayerRef.current.addData(geoJsonData.features); // Show all points after flying
      // });
    } else if (data === "zoomOut") {
      geoJsonLayerRef.current.clearLayers(); // Remove points before flying
      map.current.flyTo([40.0902, -90.7129], 3.5); // Use flyTo for animation
      map.current.once("moveend", () => {
        geoJsonLayerRef.current.addData(geoJsonData.features); // Show all points after flying
      });
    } else if (data === "cluster0") {
      geoJsonLayerRef.current.clearLayers(); // Remove points before flying
      map.current.flyTo([40.0902, -80.7129], 4.5); // Use flyTo for animation
      map.current.once("moveend", () => {
        geoJsonLayerRef.current.addData(filteredFeaturesByCluster[0]); // Show only cluster 0 points after flying
      });
    } else if (data === "cluster1") {
      geoJsonLayerRef.current.clearLayers(); // Remove points before flying
      map.current.flyTo([40.0902, -80.7129], 4.5); // Use flyTo for animation
      map.current.once("moveend", () => {
        geoJsonLayerRef.current.addData(filteredFeaturesByCluster[1]); // Show only cluster 1 points after flying
      });
    } else if (data === "cluster2") {
      geoJsonLayerRef.current.clearLayers(); // Remove points before flying
      map.current.flyTo([40.0902, -80.7129], 4.5); // Use flyTo for animation
      map.current.once("moveend", () => {
        geoJsonLayerRef.current.addData(filteredFeaturesByCluster[2]); // Show only cluster 2 points after flying
      });
    } else if (data === "cluster3") {
      geoJsonLayerRef.current.clearLayers(); // Remove points before flying
      map.current.flyTo([40.0902, -80.7129], 4.5); // Use flyTo for animation
      map.current.once("moveend", () => {
        geoJsonLayerRef.current.addData(filteredFeaturesByCluster[3]); // Show only cluster 3 points after flying
      });
    } else if (data === "cluster4") {
      geoJsonLayerRef.current.clearLayers(); // Remove points before flying
      map.current.flyTo([40.0902, -80.7129], 4.5); // Use flyTo for animation
      map.current.once("moveend", () => {
        geoJsonLayerRef.current.addData(filteredFeaturesByCluster[4]); // Show only cluster 4 points after flying
      });
    } else if (data === "cluster5") {
      geoJsonLayerRef.current.clearLayers(); // Remove points before flying
      map.current.flyTo([40.0902, -80.7129], 4.5); // Use flyTo for animation
      map.current.once("moveend", () => {
        geoJsonLayerRef.current.addData(filteredFeaturesByCluster[5]); // Show only cluster 5 points after flying
      });
    }
  };

  return (
    <div className="map-section" style={{ paddingBottom: "50vh" }}>
      <div
        ref={mapContainer}
        className="map-container"
        style={{
          height: "94vh",
          position: "fixed",
          top: 60,
          left: 0,
          width: "100%",
        }} // Make the map container full page and fixed
      ></div>
      <div className="scroll-section">
        <Scrollama onStepEnter={onStepEnter}>
          <Step data="allScene">
            <section
              className="scene scene-section flex-row flex-justify-end first-map-scene"
              id="pedestrian-cluster-scene"
              data-map-id="clusterScene"
              style={{ marginTop: "20vh" }}
            >
              <article className="scene-text">
                <h2 className="scene-header">
                  FARS 2024: U.S. Pedestrian Crash Data Clustered by Contextual
                  Patterns
                </h2>
                <p>
                  This interactive map displays pedestrian-involved vehicle
                  crashes across the United States from 2016 to 2023, clustered
                  using behavioral, environmental, and roadway context to
                  highlight underlying crash patterns. Each point on the map
                  represents a single crash event and is color-coded according
                  to its assigned cluster. These clusters were derived from a
                  national dataset of over 66,000 crash records, enabling
                  insights into the conditions and environments under which
                  pedestrian crashes most frequently occur.
                </p>
                <p>
                  The cluster colors represent the following contextual
                  categories:
                  <span className="lts-1-color lts-highlights"></span>
                  <span>School Zone / Youth Involvement</span>
                  <span className="lts-2-color lts-highlights"></span>
                  <span>Poor Visibility or Weather Conditions</span>
                  <span className="lts-3-color lts-highlights"></span>
                  <span>Legal Pedestrian Areas</span>
                  <span className="lts-4-color lts-highlights"></span>
                  <span>High-Speed Roadways</span>
                  <span className="lts-5-color lts-highlights"></span>
                  <span>Rural Area Incidents</span>
                  <span className="lts-default-color lts-highlights"></span>
                  <span>Miscellaneous / Ambiguous</span>.
                </p>
                <p>
                  <em>
                    Click on any point to explore detailed crash data, including
                    location, time of day, weather, road type, and pedestrian
                    activity. This map serves as a tool for analyzing trends in
                    pedestrian safety and identifying opportunities for targeted
                    interventions nationwide.
                  </em>
                </p>
              </article>
            </section>
          </Step>
          <Step data="zoomOut">
            <section
              className="scene scene-section flex-row flex-justify-end first-map-scene"
              id="pedestrian-cluster-zoom-scene"
              data-map-id="clusterScene"
              style={{ marginTop: "20vh" }}
            >
              <article className="scene-text">
                <h2 className="scene-header">Not Just Mainland US</h2>
                <p>
                  Pause and take a look at the map. The data is not limited to
                  the contiguous United States. The map includes data from
                  Hawaii, Alaska, and U.S. territories. The map is designed to
                  provide a comprehensive view of pedestrian-involved vehicle
                  crashes across the entire United States, including areas that
                  may not be as densely populated or have different roadway
                  conditions.
                </p>
                <p>
                  The cluster colors represent the following contextual
                  categories:
                  <span className="lts-1-color lts-highlights"></span>
                  <span>School Zone / Youth Involvement</span>
                  <span className="lts-2-color lts-highlights"></span>
                  <span>Poor Visibility or Weather Conditions</span>
                  <span className="lts-3-color lts-highlights"></span>
                  <span>Legal Pedestrian Areas</span>
                  <span className="lts-4-color lts-highlights"></span>
                  <span>High-Speed Roadways</span>
                  <span className="lts-5-color lts-highlights"></span>
                  <span>Rural Area Incidents</span>
                  <span className="lts-default-color lts-highlights"></span>
                  <span>Miscellaneous / Ambiguous</span>.
                </p>
                <p>
                  <em>
                    You can pause at a scene, and interact with the map to
                    explore the data. Click on any point to explore detailed
                    crash data, including location, time of day, weather, road
                    type, and pedestrian activity. This map serves as a tool for
                    analyzing trends in pedestrian safety and identifying
                    opportunities for targeted interventions nationwide.
                  </em>
                </p>
              </article>
            </section>
          </Step>
          <Step data="cluster0">
            <section
              className="scene scene-section flex-row flex-justify-end first-map-scene"
              id="pedestrian-cluster-scene"
              data-map-id="clusterScene"
              style={{ marginTop: "20vh" }}
            >
              <article className="scene-text">
                <h2 className="scene-header">
                  Cluster 0: School Zone / Youth Involvement
                </h2>
                <p>
                  This cluster represents crashes that occurred near school
                  zones or involved child pedestrians. It includes incidents
                  related to school bus activity, children darting into the
                  roadway, and play-related behavior such as running or biking
                  near traffic. While these types of crashes make up a smaller
                  percentage of the total dataset, they carry significant safety
                  implications due to the vulnerability of young pedestrians and
                  the environments in which these incidents typically occur.
                </p>
                <p>
                  These crashes often happen during school arrival or dismissal
                  times, and may involve low-speed local roads that are heavily
                  trafficked during short time windows. Intervention strategies
                  here include improved signage, reduced speed limits in school
                  zones, crossing guards, and infrastructure improvements like
                  raised crosswalks and flashing beacons.
                </p>
                <p>
                  <em>
                    Click on a point in this cluster to view specific details,
                    such as whether a school bus was involved, the pedestrian’s
                    age, and time of day. Use this cluster to explore trends in
                    crashes involving young or school-bound pedestrians.
                  </em>
                </p>
              </article>
            </section>
          </Step>
          <Step data="cluster1">
            <section
              className="scene scene-section flex-row flex-justify-end first-map-scene"
              id="pedestrian-cluster1-scene"
              data-map-id="clusterScene"
              style={{ marginTop: "20vh" }}
            >
              <article className="scene-text">
                <h2 className="scene-header">
                  Cluster 1: Poor Visibility or Weather Conditions
                </h2>
                <p>
                  This cluster captures pedestrian crashes that occurred under
                  challenging visibility or adverse weather conditions. These
                  include incidents at dusk, dawn, or nighttime, as well as
                  during rain, fog, snow, or sleet. Such environments reduce
                  both pedestrian visibility and driver reaction time, often
                  resulting in higher crash risk and severity.
                </p>
                <p>
                  Many of these crashes occur outside of well-lit areas or
                  during transitional lighting conditions when visibility drops
                  rapidly. Roadways may lack sufficient lighting, reflective
                  signage, or pedestrian-focused design features. Additionally,
                  wet or icy road surfaces further contribute to delayed
                  stopping distances and unpredictable vehicle behavior.
                </p>
                <p>
                  <em>
                    Click on a point in this cluster to explore specific crash
                    details including lighting condition, weather at the time of
                    the crash, and time of day. This cluster can help identify
                    where lighting upgrades, visibility enhancements, or
                    weather-related policies might reduce crash risk.
                  </em>
                </p>
              </article>
            </section>
          </Step>
          <Step data="cluster2">
            <section
              className="scene scene-section flex-row flex-justify-end first-map-scene"
              id="pedestrian-cluster2-scene"
              data-map-id="clusterScene"
              style={{ marginTop: "20vh" }}
            >
              <article className="scene-text">
                <h2 className="scene-header">
                  Cluster 2: Legal Pedestrian Areas
                </h2>
                <p>
                  This cluster includes crashes where pedestrians were using
                  designated pedestrian spaces such as crosswalks, sidewalks, or
                  paved shoulders. These are areas where pedestrian presence is
                  expected and legally protected, yet crashes still occurred —
                  highlighting gaps in driver awareness, enforcement, or
                  infrastructure design.
                </p>
                <p>
                  Many of these incidents involve drivers failing to yield at
                  marked crossings, turning without checking for pedestrians, or
                  encroaching into pedestrian space. While these areas are meant
                  to offer safety, lack of visibility, insufficient signage, or
                  driver distraction can undermine their effectiveness. This
                  cluster emphasizes the importance of not only building
                  pedestrian infrastructure but also ensuring it's respected and
                  reinforced through design and policy.
                </p>
                <p>
                  <em>
                    Click on a point in this cluster to view information such as
                    whether the crash occurred in a crosswalk, along a sidewalk,
                    or on a shoulder. Use this cluster to identify where
                    protected walking spaces still require stronger safeguards.
                  </em>
                </p>
              </article>
            </section>
          </Step>
          <Step data="cluster3">
            <section
              className="scene scene-section flex-row flex-justify-end first-map-scene"
              id="pedestrian-cluster3-scene"
              data-map-id="clusterScene"
              style={{ marginTop: "20vh" }}
            >
              <article className="scene-text">
                <h2 className="scene-header">Cluster 3: High-Speed Roadways</h2>
                <p>
                  This cluster represents crashes that occurred on high-speed
                  roadways such as interstates, freeways, and major arterial
                  routes. These environments are typically not designed with
                  pedestrian safety in mind and often lack sidewalks, safe
                  crossing points, or proper pedestrian visibility measures.
                </p>
                <p>
                  Crashes in this cluster tend to be more severe due to the
                  higher speeds involved. In many cases, pedestrians may have
                  been crossing mid-block, accessing transit stops, or walking
                  along shoulders or ramps. Some incidents may also involve
                  stranded pedestrians, vehicle breakdowns, or individuals
                  attempting to cross multiple lanes of fast-moving traffic.
                </p>
                <p>
                  <em>
                    Click on a crash point in this cluster to examine the road
                    type, pedestrian position, and possible contributing
                    factors. This cluster helps identify where high-speed roads
                    intersect with pedestrian activity — revealing opportunities
                    for fencing, grade separation, or improved access design.
                  </em>
                </p>
              </article>
            </section>
          </Step>
          <Step data="cluster4">
            <section
              className="scene scene-section flex-row flex-justify-end first-map-scene"
              id="pedestrian-cluster4-scene"
              data-map-id="clusterScene"
              style={{ marginTop: "20vh" }}
            >
              <article className="scene-text">
                <h2 className="scene-header">
                  Cluster 4: Rural Area Incidents
                </h2>
                <p>
                  This cluster captures crashes that occurred in rural or
                  low-inventory roadway environments. These areas often lack
                  basic pedestrian infrastructure such as sidewalks, crosswalks,
                  or adequate lighting. Long stretches of road, high vehicle
                  speeds, and limited enforcement contribute to elevated risk
                  for pedestrians.
                </p>
                <p>
                  Pedestrians in rural areas may walk along unpaved shoulders,
                  cross highways with no marked crossings, or be involved in
                  vehicle breakdown situations. Crashes in this cluster can also
                  reflect agricultural, recreational, or work-related pedestrian
                  movement outside urban centers — contexts that require
                  different safety strategies than typical city environments.
                </p>
                <p>
                  <em>
                    Click on points in this cluster to explore crash context,
                    roadway classification, and location type. Use this cluster
                    to identify where rural pedestrian activity intersects with
                    underdeveloped infrastructure, and where interventions such
                    as wider shoulders, rural lighting, or pedestrian warning
                    signs may be needed.
                  </em>
                </p>
              </article>
            </section>
          </Step>
          <Step data="cluster5">
            <section
              className="scene scene-section flex-row flex-justify-end first-map-scene"
              id="pedestrian-cluster5-scene"
              data-map-id="clusterScene"
              style={{ marginTop: "20vh" }}
            >
              <article className="scene-text">
                <h2 className="scene-header">
                  Cluster 5: Miscellaneous / Ambiguous
                </h2>
                <p>
                  This cluster includes pedestrian crashes that do not clearly
                  fall into any of the more defined categories. These may
                  involve rare or unusual scenarios, inconsistent reporting, or
                  incomplete contextual data, but still represent real events
                  with potential safety insights.
                </p>
                <p>
                  Incidents in this group may include crashes in parking lots,
                  driveways, or non-trafficway locations; crashes involving
                  unique pedestrian behavior; or cases where critical details
                  like lighting, road type, or pedestrian position were not
                  reported. Although these crashes are harder to categorize,
                  they highlight the need for better data collection and
                  awareness of non-traditional pedestrian environments.
                </p>
                <p>
                  <em>
                    Click on a point in this cluster to explore the available
                    details and note where data gaps may exist. This cluster
                    encourages further investigation and may guide efforts in
                    improving crash reporting standards, especially in complex
                    or unconventional crash settings.
                  </em>
                </p>
              </article>
            </section>
          </Step>
        </Scrollama>
      </div>
    </div>
  );
};

export default MapSection;
