# 🍵 Weather Cereal – A Zen Weather Experience

🌤️ **A calming, mobile-first weather app that visualizes real-time forecasts through ambient sounds and physics-based 3D scenes.**  
🔗 **Live Demo:** [weather-cereal.vercel.app](https://weather-cereal.vercel.app/)  
📖 **Case Study:** [project page](https://toshihito-endo.com/weather-cereal)

---

## 📌 Overview

**Weather Cereal** reimagines the morning ritual of checking the weather. Inspired by the peaceful mood of Japanese Zen gardens, it transforms functional forecasts into a **visually and emotionally engaging 3D experience**.

- 🌦️ **Weather-reactive visuals and sounds** create a calming transition from sleep to action.
- 📱 **Mobile-first design** tailored for daily check-ins.
- 🌍 Supports real-time **geo-location weather** + manual city lookup.

![Preview Image](/public/videos/weather-cereal/weather-cereal-preview.gif)

---

## ✨ Features

- ☁️ **Falling 3D Weather Icons** – Physics-driven particles reflect current weather.
- 🪷 **Zen Garden Scene** – Minimalist, meditative 3D space.
- 🎧 **Auto-play Ambient Audio** – Nature-based sounds (e.g. rain, wind, birds).
- ⏱️ **48-Hour Forecast Timeline** – Clear visuals with categorized icons.
- ☔ **Precipitation Tagging System** – Labelled detail (e.g., "misty", "dry air", "heavy rain").
- 📍 **Geo-based Auto Location** – Fetches forecast based on user’s location.
- 🌐 **Global Search Support** – Enter any city name to check weather worldwide.

---

## 🛠️ Tech Stack

| **Category**        | **Technology Used**          |
| ------------------- | ---------------------------- |
| 🌐 **Framework**     | Next.js, React               |
| 🎮 **3D Engine**     | React Three Fiber, Rapier.js |
| 🌤️ **Weather API**   | OpenWeatherMap API           |
| 🎨 **Design**        | Custom 3D Icons, Gobo-like custom "komorebi" shadows |
| 🔊 **Audio**         | Dynamic nature-based ambient audio |
| 📦 **Deployment**    | Vercel                       |

---

## 📥 Installation & Setup

### 1️⃣ Clone This Repository

```bash
git clone https://github.com/GentleHorse/Weather-Cereal.git
cd Weather-Cereal
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create a `.env.local` File

```env
API_KEY=your_openweathermap_api_key_here
```

### 4️⃣ Start the Development Server

```bash
npm run dev
```

_(Runs on `localhost:3000` by default.)_

---

## 🔒 Environment Variables

To keep your API key secure, make sure you:

- Store it in a `.env.local` file
- Add `.env.local` to `.gitignore`

```gitignore
.env.local
```

---

## 🧠 Concept & Context

This app explores the psychological side of daily habits. The idea: **weather apps aren't just about planning, but also emotional readiness**. By integrating visual calmness, sound design, and weather data, Weather Cereal turns a routine check-in into a **mood-lifting micro-moment**.

Inspired by:

- 🧘‍♂️ Morning mindfulness
- 🍵 The ritual of breakfast
- ☀️ Real-world weather needs (especially in rainy Netherlands!)
- 🎐 Japanese aesthetic concepts like Zen gardens and Komorebi

---

## 📚 Libraries Used

- [dotenv](https://www.npmjs.com/package/dotenv)
- [three](https://threejs.org/)
- [leva](https://github.com/pmndrs/leva)
- [r3f-perf](https://github.com/utsuboco/r3f-perf)
- [postprocessing](https://pmndrs.github.io/postprocessing/public/docs/)
- [@react-three/fiber](https://r3f.pmnd.rs/)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [@react-three/rapier](https://github.com/pmndrs/react-three-rapier)
- [zustand](https://zustand.pmnd.rs/)

---

## 📧 Contact

📌 **Portfolio:** [toshihito-endo.com](https://toshihito-endo.com/works)  
📌 **GitHub:** [GentleHorse](https://github.com/GentleHorse)  
📌 **LinkedIn:** [Toshihito Endo](https://www.linkedin.com/in/toshihito-endo-a68a82172/)