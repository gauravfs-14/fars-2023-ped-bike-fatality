const Header = () => (
  <nav className="flex-row flex-justify-between top-nav" id="top-nav">
    <a
      href="/transportation/bicycle/"
      target="_blank"
      rel="noreferrer noopener"
    >
      <img src="./img/logo.png" alt="DVRPC logo" className="nav-logo" />
    </a>
    <div className="flex-row flex-align-center nav-link-wrapper">
      <button
        className="nav-link-home nav-link flex-row flex-justify-center"
        onClick={() => window.scrollTo(0, 0)}
      >
        home
        <BikeIcon className="nav-bike nav-bike-green" />
      </button>
      <a
        href="/webmaps/bike-lts/analysis/"
        target="_blank"
        rel="noreferrer noopener"
        className="nav-link nav-link-map flex-row flex-justify-center"
      >
        interactive map
        <BikeIcon className="nav-bike nav-bike-yellow" />
      </a>
    </div>
  </nav>
);
