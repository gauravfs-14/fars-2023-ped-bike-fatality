export default function Header() {
  return (
    <nav className="flex-row flex-justify-between top-nav" id="top-nav">
      <a href="#" rel="noreferrer noopener">
        <img src="./img/logo.png" alt="AIT Lab logo" className="nav-logo" />
      </a>
      <div className="flex-row flex-align-center nav-link-wrapper">
        <button
          className="nav-link-home nav-link flex-row"
          onClick={() => window.scrollTo(0, 0)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            justifyContent: "space-between",
          }}
        >
          Home
        </button>
      </div>
    </nav>
  );
}
