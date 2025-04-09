export default function weatherConditionConverter(data) {
  let weatherCondition;
  switch (data) {
    case "Clear":
      weatherCondition = "clear";
      break;

    case "Clouds":
      weatherCondition = "clouds";
      break;

    case "Rain":
      weatherCondition = "rain";
      break;

    case "Drizzle":
      weatherCondition = "drizzle";
      break;

    case "Thunderstorm":
      weatherCondition = "thunderstorm";
      break;

    case "Snow":
      weatherCondition = "snow";
      break;

    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
    case "Squall":
    case "Tornado":
      weatherCondition = "mist";
      break;
  }

  return weatherCondition;
}
