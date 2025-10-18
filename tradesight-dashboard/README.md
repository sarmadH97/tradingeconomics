# 📊 TradeSight — Country Economic Dashboard (React + TypeScript)

Compare multiple macro-economic indicators between two countries using live data from the **TradingEconomics API**.

---

## 🧭 Overview

**TradeSight** is a React + TypeScript web application that visualizes global macroeconomic data in an interactive dashboard.  
It allows users to pick two countries and compare several key indicators — such as GDP growth, inflation, unemployment, interest rate, and government debt-to-GDP — with live data fetched from the [TradingEconomics Developer API](https://developer.tradingeconomics.com/).

---

## 🚀 Features

- 🌍 Country selector for easy comparison  
- 📈 Multi-indicator visualization using Recharts  
- 🧮 Summary comparison table  
- 🧠 Auto-generated text insights  
- ⚡ Built with Vite + React + TypeScript + TailwindCSS  

## 📸 Preview

> Add a screenshot or GIF of your application here to give visitors a quick visual overview.
> You can also add a link to a live demo if available.

---

## 🧰 Tech Stack

| Category | Tool / Library |
|-----------|----------------|
| Framework | [React 18](https://react.dev/) |
| Compiler | [React Compiler](https://react.dev/learn/react-developer-tools#browser-extension) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Styling | [TailwindCSS](https://tailwindcss.com/) |
| Charts | [Recharts](https://recharts.org/en-US/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| API | [TradingEconomics REST API](https://docs.tradingeconomics.com/) |

---

## ⚙️ Getting Started

### 1️⃣ Clone or Fork

```bash
git clone https://github.com/sarmadH97/tradingeconomics.git
cd trading-sight
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Add Environment Variables

Create a `.env` file in the project root:

```bash
VITE_TE_API_KEY=guest:guest
```

> ⚠️ Replace `guest:guest` with your own API key from  
> [developer.tradingeconomics.com](https://developer.tradingeconomics.com/) for full access.

### 4️⃣ Run the App

```bash
npm run dev
```

Visit **http://localhost:5173** in your browser.

> 💡 The app includes a demo mode that activates automatically when API rate limits are reached,
> allowing you to test and develop without consuming your API quota.

---

## 🧩 Project Structure

```
src/
├─ api/
│  └─ teClient.ts          # Handles TradingEconomics API calls
├─ components/
│  ├─ CountrySelector.tsx  # Dropdown selector for countries
│  ├─ IndicatorChart.tsx   # Recharts line chart component
│  ├─ ComparisonTable.tsx  # Data comparison table
│  └─ InsightCard.tsx      # Insight summary component
├─ types/
│  └─ index.ts             # TypeScript interfaces
├─ App.tsx                 # Main app logic
└─ main.tsx                # Entry point
```

---

## 📈 Example API Usage

**Fetch GDP Growth for United States:**

```ts
GET https://api.tradingeconomics.com/historical/country/united%20states/indicator/gdp?c=guest:guest
```

**Response Example:**
```json
[
  {
    "Country": "United States",
    "Category": "GDP Growth Rate",
    "DateTime": "2024-07-01T00:00:00Z",
    "Value": 2.5
  }
]
```

---

## 🧠 How It Works

1. The user selects two countries.  
2. The app calls the TradingEconomics API for several indicators per country.  
3. Data is formatted and displayed in:
   - **Charts** (Recharts line charts)
   - **Tables** (comparison of latest values)
   - **Text Insights** (basic logic-based comparisons)

---

## 🧪 Troubleshooting

**403 Forbidden?**  
Your key or endpoint may not have access to certain data.  
Try:
- Verifying your API key is correct and active.  
- Testing with a simpler endpoint (like `/country/all`).  
- Checking that your account plan includes the indicator.  
- Avoiding browser-direct API calls (CORS limits). Use a proxy if needed.

---

## 📤 Deployment

You can easily deploy the project via:
- **GitHub Pages**
- **Vercel**
- **Netlify**

For Vite projects:
```bash
npm run build
npm run preview
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the existing code style.

## 🧾 License

This project is open-source and free for educational purposes.  
All economic data is provided by [TradingEconomics](https://tradingeconomics.com) under their developer terms.

---

## 👨‍💻 Author

**Sarmad Hussain**  
[LinkedIn](https://linkedin.com/in/sarmad-hussainz) • [GitHub](https://github.com/sarmadH97)
