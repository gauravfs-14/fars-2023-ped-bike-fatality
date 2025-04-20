const MainContent = () => (
  <main id="scroll-story-main">
    <div className="map-wrapper">
      <section
        className="scene scene-section flex-row flex-justify-between"
        id="what-is-LTS-scene"
        data-map-id="noMap"
      >
        <article className="flex-row flex-align-center fadein what-is-lts-content-wrapper">
          <div className="what-is-lts-text">
            <h2 className="what-is-lts-header">
              What are the Contextual Clusters of Pedestrian Crashes?
            </h2>
            <p>
              This map presents pedestrian-involved vehicle crashes that
              occurred across the United States between 2016 and 2023. The
              dataset includes over 66,000 crash records and has been
              contextually clustered based on roadway type, visibility, weather,
              pedestrian activity, and environmental conditions.
            </p>
            <p>
              Instead of grouping by severity or location alone, these clusters
              are built from behavioral and situational patterns — offering a
              more meaningful perspective on when, where, and why crashes
              involving pedestrians occur. The clusters serve as analytical
              lenses to help researchers, policymakers, and safety advocates
              identify problem areas and prioritize interventions.
            </p>
            <p>
              The table below outlines the six cluster types used in this study:
            </p>
          </div>

          <table id="regional-lts-table">
            <thead>
              <tr>
                <th className="regional-lts-table-th top-left-corner-cell">
                  Cluster
                </th>
                <th className="regional-lts-table-th text-right table-pad-right">
                  Title
                </th>
                <th className="regional-lts-table-th top-right-corner-cell">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  id="regional-lts-table-1"
                  className="regional-lts-table-cat"
                >
                  0
                </td>
                <td className="text-right table-pad-right">
                  School Zone / Youth Involvement
                </td>
                <td className="text-left">
                  Crashes involving school bus activity, child pedestrians, or
                  near school zones.
                </td>
              </tr>
              <tr>
                <td
                  id="regional-lts-table-2"
                  className="regional-lts-table-cat"
                >
                  1
                </td>
                <td className="text-right table-pad-right">
                  Poor Visibility / Weather
                </td>
                <td className="text-left">
                  Crashes that occurred during dusk, dawn, night, fog, rain, or
                  snowy weather.
                </td>
              </tr>
              <tr>
                <td
                  id="regional-lts-table-3"
                  className="regional-lts-table-cat"
                >
                  2
                </td>
                <td className="text-right table-pad-right">
                  Legal Walking Areas
                </td>
                <td className="text-left">
                  Pedestrians were using sidewalks, crosswalks, or shoulders —
                  areas meant for walking.
                </td>
              </tr>
              <tr>
                <td
                  id="regional-lts-table-4"
                  className="regional-lts-table-cat"
                >
                  3
                </td>
                <td className="text-right table-pad-right">
                  High-Speed Roadways
                </td>
                <td className="text-left">
                  Crashes occurring on interstates, freeways, and major
                  arterials where speeds are higher.
                </td>
              </tr>
              <tr>
                <td
                  id="regional-lts-table-5"
                  className="regional-lts-table-cat"
                >
                  4
                </td>
                <td className="text-right table-pad-right">
                  Rural Area Incidents
                </td>
                <td className="text-left">
                  Events in rural or low-inventory roadways with minimal
                  pedestrian infrastructure.
                </td>
              </tr>
              <tr>
                <td
                  id="regional-lts-table-default"
                  className="regional-lts-table-cat"
                >
                  5
                </td>
                <td className="text-right table-pad-right">
                  Miscellaneous / Ambiguous
                </td>
                <td className="text-left">
                  Crashes that did not meet the criteria for any specific
                  cluster but still carry significance.
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </section>
    </div>
  </main>
);

export default MainContent;
