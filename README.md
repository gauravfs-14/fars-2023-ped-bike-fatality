# 🚶‍♀️ Pedestrian Crash Clustering Visualization (2016–2023)

An interactive data storytelling platform that visualizes **pedestrian-involved vehicle crashes** across the United States using **contextual clustering**. The tool helps explore **behavioral, environmental, and roadway-related crash patterns** using a scroll-based narrative paired with an interactive Leaflet map.

---

### ✨ Features

- 📍 **Interactive map** showing crash locations using Leaflet
- 🎨 **Color-coded clusters** based on crash context (lighting, weather, road type, behavior)
- 📖 **Scroll-driven storytelling** using Scrollama
- 💬 **Dynamic popups** showing detailed crash attributes
- 🗺️ **Dark-themed basemap** from CARTO for visual clarity
- 📊 **Nationwide dataset** from 2016 to 2023 with over 66,000 crash records

---

### 🧠 Clustering Logic

Each crash is grouped into one of six **contextual clusters**:

| Cluster ID | Label                           | Description                                                                 |
| ---------- | ------------------------------- | --------------------------------------------------------------------------- |
| `0`        | School Zone / Youth Involvement | Involves school zones, children, or school bus-related incidents            |
| `1`        | Poor Visibility / Weather       | Occurred during fog, rain, snow, or low-light conditions like dusk or night |
| `2`        | Legal Pedestrian Areas          | Took place on sidewalks, crosswalks, or shoulders                           |
| `3`        | High-Speed Roadways             | Happened on interstates, freeways, or principal arterials                   |
| `4`        | Rural Area Incidents            | Took place in rural or low-inventory trafficways                            |
| `5`        | Miscellaneous / Ambiguous       | Unclassified or irregular crash scenarios                                   |

---

### 🧱 Technology Stack

- ⚛️ **React** – UI framework
- 🗺️ **Leaflet** – Interactive mapping
- 📜 **Scrollama** – Scroll-triggered storytelling
- ⚡ **Vite** – Fast development bundler
- 🌙 **CARTO Dark Matter** – Basemap tile layer

---

### 📁 Data Structure

The application uses **GeoJSON** with the following structure:

```ts
interface PedestrianCrashData {
  CRASH_NUM1: string;
  LATITUDENAME: number;
  LONGITUDNAME: number;
  YEAR: number;
  MONTHNAME: string;
  DAY: number;
  DAY_WEEKNAME: string;
  HOURNAME: string;
  STATENAME: string;
  COUNTYNAME: string;
  CITYNAME: string;
  WEATHERNAME: string;
  LGT_CONDNAME: string;
  FUNC_SYSNAME: string;
  RUR_URBNAME: string;
  PBPTYPENAME: string;
  PBAGE: number;
  PBSEXNAME: string;
  PEDCTYPENAME: string;
  PEDPOSNAME: string;
  cluster: number; // 0–5 cluster label
}
```

---

### 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/gauravfs-14/pedestrian-cluster-map.git
   cd pedestrian-cluster-map
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

### 📌 Notes

- The project supports scroll-driven visualization for each cluster using `<Step>` components.
- Each cluster section highlights a unique pedestrian safety insight based on national crash data.
