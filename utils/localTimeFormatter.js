export default function localTimeFormatter(
    weather,
    hour = "numeric",
    minute = "2-digit",
    hour12 = true,
    locale = "en-US"  // "ja-JP", "fr-FR", "ar-EG", etc
  ) {
    const timeZone = weather?.timezone || "UTC";
    return new Intl.DateTimeFormat(locale, {
      timeZone,
      hour,
      minute,
      hour12,
    });
  }
