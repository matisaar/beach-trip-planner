# 🏖️ Beach Trip Planner

**Interactive vacation planner for couples — find your perfect beach getaway based on what matters most to you.**

> Built for a Toronto couple planning a late August 2026 trip on a $5,000 CAD budget. Works for anyone.

![HTML](https://img.shields.io/badge/HTML-5-orange?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-3-blue?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript&logoColor=white)
![Destinations](https://img.shields.io/badge/Destinations-25-green)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## ✨ What It Does

Set your budget, dates, and travel preferences using interactive sliders — the app scores and ranks **25 beach destinations** worldwide based on what you care about most.

Each destination includes:
- 💰 **Full budget breakdown** — flights, accommodation, food, activities, transport
- 🔗 **Direct booking links** — Google Flights, Kayak, Skyscanner, Airbnb
- 🏖️ **Top beaches** — with Google Maps links
- 🎯 **Activities & excursions** — with costs and map links
- 🍽️ **Restaurant picks** — from $1 street food to Michelin-starred
- 📅 **7-day itinerary** — day-by-day plan with estimated daily costs
- 📱 **Food delivery apps** — what works in each destination

---

## 🌍 25 Destinations

| Region | Destinations |
|--------|-------------|
| **Caribbean & Mexico** | Tulum · Cancún · Punta Cana · Aruba · Negril · Turks & Caicos · Barbados · Curaçao · St. Lucia |
| **Central America** | Costa Rica (Guanacaste) |
| **Southeast Asia** | Bali · Koh Samui · Phuket · Hoi An/Da Nang · El Nido |
| **Europe** | Crete · Algarve · Sardinia · Dubrovnik/Hvar · Tenerife |
| **Africa & Indian Ocean** | Zanzibar · Mauritius · Hurghada |
| **Pacific & Americas** | Fiji · Maui · Maldives |

---

## 🎯 Preference Sliders

Drag to prioritize what matters — the algorithm weights each destination accordingly:

| Slider | What It Measures |
|--------|-----------------|
| 🏖️ Beach Quality | Sand, water clarity, beauty |
| 💸 Budget Friendly | How far your dollar goes |
| 🍽️ Food & Dining | Local cuisine, restaurant scene |
| 🏛️ Culture & History | Museums, ruins, local traditions |
| 🤿 Adventure | Diving, hiking, excursions |
| 💆 Relaxation & Spa | Chill factor, massage costs |
| 🌅 Romance | Couple-friendly vibes, sunsets |
| 🍹 Nightlife | Bars, clubs, beach parties |
| 📱 Easy Travel | Flight time, direct routes, visa |
| 📸 Instagrammable | Scenic, photogenic locations |

---

## 🖥️ Screenshot

```
┌──────────────────────────────────────┐
│  🏖️ Beach Trip Planner              │
│  Toronto → Paradise · Late Aug 2026  │
│                                      │
│  ✈️ Trip Basics                      │
│  💰 $5,000 CAD  📅 Aug 22-29        │
│                                      │
│  🎯 What Matters to You?            │
│  Beach Quality    ████████░░  8      │
│  Budget Friendly  ███████░░░  7      │
│  Romance Factor   ████████░░  8      │
│                                      │
│  [🔍 Find My Perfect Beach Trip]    │
│                                      │
│  🏆 YOUR #1 MATCH                   │
│  🇲🇽 Tulum, Mexico                  │
│  Score: 8.7/10 · $2,990 CAD         │
│                                      │
│  #1 🇲🇽 Tulum          $2,990  8.7  │
│  #2 🇮🇩 Bali            $4,085  8.4  │
│  #3 🇬🇷 Crete           $4,345  8.1  │
│  ...                                 │
└──────────────────────────────────────┘
```

---

## 🚀 Usage

**Zero dependencies. Just open the HTML file.**

### Option 1 — Local
```bash
git clone https://github.com/matisaar/beach-trip-planner.git
cd beach-trip-planner
open index.html
# or just double-click index.html
```

### Option 2 — Live (GitHub Pages)
👉 **[matisaar.github.io/beach-trip-planner](https://matisaar.github.io/beach-trip-planner/)**

### Option 3 — Local server
```bash
cd beach-trip-planner
python -m http.server 8080
# open http://localhost:8080
```

---

## 🏗️ Tech Stack

- **Single HTML file** — no build tools, no frameworks, no dependencies
- **Vanilla JavaScript** — weighted scoring algorithm with real-time calculation
- **CSS3** — responsive design, glassmorphism, smooth animations
- **Data** — 25 destinations with manually curated scores, prices (CAD), links, and itineraries

---

## 🧮 How Scoring Works

```
finalScore = Σ(preferenceWeight × destinationScore) / Σ(preferenceWeight)
```

- Each destination has a score (0-10) for each of the 10 preference categories
- Your slider values act as weights
- Budget penalty: if estimated cost exceeds your max budget, the score drops proportionally
- Budget bonus: if you prioritize "Budget Friendly" and a destination is well under budget, it gets a boost

---

## 📊 Data Sources

Prices and scores are based on:
- Airbnb listings (scraped Aug 2026 availability)
- Google Flights / Kayak / Skyscanner fare estimates
- TripAdvisor, travel blogs, and personal research
- Restaurant prices from Google Maps and review sites

> ⚠️ All prices are **estimates in CAD** for late August 2026. Actual costs will vary. Always check booking links for real-time pricing.

---

## 🗂️ Project Structure

```
beach-trip-planner/
└── index.html    ← the entire app (single file)
```

That's it. One file. ~2,500 lines of self-contained HTML/CSS/JS.

---

## 📝 License

MIT — do whatever you want with it.

---

<p align="center">
  Made with ☀️ for beach lovers everywhere
</p>
