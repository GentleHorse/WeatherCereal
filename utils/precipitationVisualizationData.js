export default function precipitationVisualizationData(
  precipitation,
  graphHeight
) {
  let colorCode;
  let barHeight;
  let imageSrc;
  let label;

  if (precipitation === 0) {
    colorCode = "#78C2C4";
    barHeight = 0;
    imageSrc = "/images/data-state/precipitation/clear.svg";
    label = "Clear";
  }

  if (precipitation > 0 && precipitation <= 0.2) {
    colorCode = "#A2D7DD";
    barHeight = graphHeight * precipitation / 30;
    imageSrc = "/images/data-state/precipitation/dry-air.svg";
    label = "Dry Air";
  }

  if (precipitation > 0.2 && precipitation <= 1.0) {
    colorCode = "#A59ACA";
    barHeight = graphHeight * precipitation / 30;
    imageSrc = "/images/data-state/precipitation/misty-drizzle.svg";
    label = "Misty Drizzle";
  }

  if (precipitation > 1.0 && precipitation <= 2.5) {
    colorCode = "#33A6B8";
    barHeight = graphHeight * precipitation / 30;
    imageSrc = "/images/data-state/precipitation/light-rain.svg";
    label = "Light Rain";
  }

  if (precipitation > 2.5 && precipitation <= 5.0) {
    colorCode = "#70B8CA";
    barHeight = graphHeight * precipitation / 30;
    imageSrc = "/images/data-state/precipitation/steady-rain.svg";
    label = "Steady Rain";
  }

  if (precipitation > 5.0 && precipitation <= 10.0) {
    colorCode = "#1E88A8";
    barHeight = graphHeight * precipitation / 30;
    imageSrc = "/images/data-state/precipitation/wet-and-heavy.svg";
    label = "Wet and Heavy";
  }

  if (precipitation > 10.0 && precipitation <= 20.0) {
    colorCode = "#B481BB";
    barHeight = graphHeight * precipitation / 30;
    imageSrc = "/images/data-state/precipitation/downpour.svg";
    label = "Downpour";
  }

  if (precipitation > 20.0 && precipitation <= 30.0) {
    colorCode = "#D0AF4C";
    barHeight = graphHeight * precipitation / 30;
    imageSrc = "/images/data-state/precipitation/soaking-storm.svg";
    label = "Soaking Storm";
  }

  if (precipitation > 30.0) {
    colorCode = "#F75C2F";
    barHeight = graphHeight;
    imageSrc = "/images/data-state/precipitation/extream-rain.svg";
    label = "Extreme Rain";
  }

  return { colorCode, barHeight, imageSrc, label };
}
