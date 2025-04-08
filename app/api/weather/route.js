export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const apiKey = process.env.WEATHER_API_KEY;

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const city = searchParams.get("city");

  if (!city && (!lat || !lon)) {
    return Response.json(
      { message: "City is required" },
      { status: 400 }
    );
  }

  try {
    let latitude = lat;
    let longitude = lon;
    let cityName = city;

    // If city is not provided, reverse geocode lat/lon on the server
    if (!city && lat && lon) {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
      );
      const geoData = await geoRes.json();

      if (!geoData.length) {
        return Response.json(
          { message: "City not found" },
          { status: 404 }
        );
      }

      cityName = geoData[0].name;
      latitude = geoData[0].lat;
      longitude = geoData[0].lon;
    }

    // If city is provided
    if (city && !lat && !lon) {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
      );
      const geoData = await geoRes.json();

      if (!geoRes.ok || !geoData[0]?.lat || !geoData[0]?.lon) {
        return new Response(
          JSON.stringify({ message: "Invalid city name or location not found" }),
          { status: 404 }
        );
      }

      cityName = city;
      latitude = geoData[0].lat;
      longitude = geoData[0].lon;
    }

    // Fetch weather
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    const weatherData = await weatherRes.json();

    if (!weatherRes.ok) {
      return Response.json(
        { message: "Failed to fetch weather data" },
        { status: 500 }
      );
    }

    // Return weather + optional city name
    return Response.json({ ...weatherData, city: cityName });
  } catch (err) {
    return Response.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
