import IconButton from "./IconButton";

export default function IntroButtons() {
  return (
    <div className="flex-column flex-align-center story-intro-btns-wrapper">
      {/* Removed "view interactive map" link */}
      <a
        href="#what-is-LTS-scene"
        className="story-intro-icon-btns-link to-first-scene"
        id="read-story-btn"
      >
        <IconButton label="begin story" />
      </a>
    </div>
  );
}
