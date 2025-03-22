export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return new Response(JSON.stringify({ message: "City is required" }), {
      status: 400,
    });
  }

  try {
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

    const { lat, lon } = geoData[0];

    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const weatherData = await weatherRes.json();

    if (!weatherRes.ok) {
      return new Response(JSON.stringify({ message: "Weather fetch failed" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(weatherData), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify(
        { message: err.message || "Something went wrong" },
        { status: 500 }
      )
    );
  }
}
