# 🌸 Weather Cereal – A Zen Weather Forecast Experience

A mobile-first, sensory-rich weather app inspired by **Japanese Zen gardens** — blending real-time forecasts with ambient **nature sounds**, handcrafted **3D scenes**, and cinematic transitions.

🔗 **Live Site:** [weather-cereal.vercel.app](https://weather-cereal.vercel.app)  
📖 **Case Study:** [toshihito-endo.com/weather-cereal](https://toshihito-endo.com/weather-cereal)

---

## 🧈 Concept

Weather Cereal reimagines weather-checking as a **mindful ritual**, not a chore.

Rather than just data, it offers a **mood-lifting experience** through:

- 🌤️ **Weather-driven 3D worlds**
- 🍃 **Immersive nature audio**
- 📱 **Touch-optimized, tactile UI**

> Inspired by **komorebi**, falling sakura petals, and tranquil garden design — this app turns forecasts into a gentle sensory micro-escape.

---

## ✨ Key Features

- 🎐 **Real-Time 3D Weather Scene**  
  Zen-garden-inspired world with falling weather icons, animated sakura petals, floating particles, dappled light (gobo-like structure), and depth of field blur.

- 🔊 **Layered Ambient Nature Sounds**  
  Dynamically mixed multi-layered audio based on weather: rain, snow, wind, birds, waterfalls, thunder, mist.

- 🥒 **48-Hour Forecast Visualization**  
  Horizontally scrollable cards with intuitive icons, temperature, and precipitation insight.

- 💧 **Precipitation Tagging System**  
  Custom scale classifies rain intensity with visual feedback (e.g., "dry air", "misty drizzle", "extreme rain").

- 📍 **Auto Location + Global Search**  
  Geolocation fetch + city input to explore weather globally.

- 🎥 **Weather Loading Animation**  
  Custom weather symbol intro video creates elegant transitions.

---

## 📅 Audio Design (Nature Layers)

Each weather condition is driven by multiple **stacked ambient layers**:

| Weather         | Layers                                   |
| --------------- | ---------------------------------------- |
| ☀️ Clear        | Waterfall, birds, wind, leaves, stream   |
| ☁️ Clouds       | Wind, distant birds, subtle forest drone |
| 🌧️ Rain         | Rainfall, puddle drips, wet leaves       |
| 🌦️ Drizzle      | Light rain, soft patter, ambient tones   |
| ⛈️ Thunderstorm | Thunder rumbles, rain, low-end textures  |
| ❄️ Snow         | Wind, crunching snow, frosty textures    |
| 🌫️ Mist         | Forest hum, drips, foggy echoes          |

---

## 🚰 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/GentleHorse/Weather-Cereal.git
cd Weather-Cereal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Your OpenWeatherMap API Key

Create a `.env.local` file:

```
WEATHER_API_KEY=your_openweathermap_api_key
```

Ensure `.env.local` is in your `.gitignore`:

```
.env.local
```

### 4. Start the Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

| Folder        | Description                                |
| ------------- | ------------------------------------------ |
| `app/`        | App router pages and layout                |
| `components/` | UI components, 3D scene, modal, weather UI |
| `public/`     | 3D icons, videos, sound files              |
| `stores/`     | Zustand app state store                    |
| `utils/`      | Audio engine, formatter, condition helpers |

---

## 🔍 Libraries Used

- [`three`](https://threejs.org/)
- [`@react-three/fiber`](https://docs.pmnd.rs/react-three-fiber/)
- [`@react-three/drei`](https://github.com/pmndrs/drei)
- [`@react-three/rapier`](https://github.com/pmndrs/react-three-rapier)
- [`postprocessing`](https://github.com/pmndrs/postprocessing)
- [`zustand`](https://github.com/pmndrs/zustand)
- [`tailwindcss`](https://tailwindcss.com/)
- [`next/font/google`](https://nextjs.org/docs/pages/api-reference/components/font#google-fonts)

---

## 📧 Contact

- 🖼️ **Portfolio:** [toshihito-endo.com](https://toshihito-endo.com/works)
- 🐈 **GitHub:** [GentleHorse](https://github.com/GentleHorse)
- 💼 **LinkedIn:** [Toshihito Endo](https://linkedin.com/in/toshihito-endo-a68a82172)

---
