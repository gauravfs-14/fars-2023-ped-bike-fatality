import React, { useEffect } from "react";
import "./mobile.css";
import "./narrow.css";
import MapSection from "./components/MapSection";
import Header from "./components/Header";
import IntroSection from "./components/IntroSection";
import MainContent from "./components/MainContent";

const App = () => {
  useEffect(() => {
    const topNav = document.getElementById("top-nav");
    const firstScene = document.getElementById("what-is-LTS-scene");
    const toFirstScene = document.querySelectorAll(".to-first-scene");

    // set up top nav scroll observer
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          topNav.classList.remove("top-nav-visible");
        } else {
          topNav.classList.add("top-nav-visible");
        }
      });
    };
    const observer = new IntersectionObserver(callback);
    observer.observe(document.getElementById("story-intro"));

    // compensate for first scene padding on zoom to
    toFirstScene.forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        window.location.hash = "what-is-LTS-scene";
        const vh = window.innerHeight * 0.2;
        window.scrollTo({
          top: firstScene.offsetHeight - vh,
          scrollBehavior: "smooth",
        });
      };
    });
  }, []);

  return (
    <div>
      <Header />
      <IntroSection />
      <MainContent />
      <MapSection />
      <Footer />
    </div>
  );
};

// const Section = ({ id, title, content }) => (
//   <section className="scene scene-section flex-row flex-justify-end" id={id}>
//     <article className="scene-text fadein">
//       <h2 className="scene-header">{title}</h2>
//       {content}
//     </article>
//   </section>
// );

const Footer = () => (
  <footer style={{ position: "relative" }}>
    <div className="footer-content flex-column flex-align-center">
      <div className="flex-row flex-justify-around flex-align-center footer-main-text">
        <img
          src="./img/logo-main.png"
          alt="TxDOT logo - footer"
          className="footer-lts-logo"
        />
        <p className="footer-p">
          This interactive platform visualizes and analyzes pedestrian-involved
          vehicle crashes across the United States from 2016 to 2023.
        </p>
      </div>
      <FooterLinks />
    </div>
  </footer>
);

const FooterLinks = () => (
  <ul className="list-unstyled footer-list-main">
    <li>
      Created by{" "}
      <a
        href="https://ait-lab.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        AIT Lab @ Texas State University
      </a>
      , 2025.
    </li>
    {/* Add other footer sections */}
  </ul>
);

export default App;
