export default function IconButton({ label }) {
  return (
    <figure className="flex-row flex-align-center flex-justify-around story-intro-icon-figure icon-button-tiny">
      <figcaption className="story-intro-figcaption">{label}</figcaption>
      <img src="/img/bike-icon.svg" alt="bike icon" style={{ width: "90px" }} />
    </figure>
  );
}
