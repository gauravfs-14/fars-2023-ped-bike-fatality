import IntroButtons from "./IntroButtons";

export default function IntroSection() {
  return (
    <section id="story-intro">
      <div
        id="story-intro-text"
        className="flex-row flex-justify-end flex-align-start"
      >
        <a
          href="https://ait-lab.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="./img/logo-main.png"
            alt="automated vehicle safety tool logo"
            className="header-logo"
          />
        </a>
        <div className="story-intro-text-wrapper">
          <header>
            <h1 className="header">
              {/* Welcome to the AIT Lab @ TXST's Automated Vehicle Safety Analysis
                                Tool! */}
            </h1>
          </header>
          <p className="story-intro-p">
            This interactive platform visualizes and analyzes
            pedestrian-involved vehicle crashes across the United States from
            2016 to 2023. Rather than focusing solely on severity or location,
            crashes are grouped into meaningful contextual clusters based on
            factors such as road type, lighting conditions, weather, pedestrian
            behavior, and environment. These clusters help uncover patterns in
            how and where crashes occur — providing new insights into pedestrian
            safety across diverse settings.
          </p>
          <p>
            Use the interactive map and data visualizations below to explore
            crash contexts, environmental risks, and roadway patterns. This
            information is valuable for researchers, planners, policymakers, and
            transportation professionals aiming to improve infrastructure,
            develop targeted safety interventions, and reduce pedestrian
            fatalities nationwide.
          </p>
        </div>
      </div>
      <IntroButtons />
    </section>
  );
}
