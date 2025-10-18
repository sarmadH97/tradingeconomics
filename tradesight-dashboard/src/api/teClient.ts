import axios, { AxiosError } from "axios";

const API_BASE = "https://api.tradingeconomics.com";
const API_KEY = import.meta.env.VITE_TE_API_KEY || "guest:guest";

export interface TEDataPoint {
  Country: string;
  Category: string;
  DateTime: string;
  Value: number;
}

// Mock data generator for development and when API limits are hit
const generateMockData = (
  countries: string[],
  indicators: string[],
  startDate: string,
  endDate: string
): TEDataPoint[] => {
  const mockData: TEDataPoint[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const yearsDiff = end.getFullYear() - start.getFullYear();

  countries.forEach(country => {
    indicators.forEach(indicator => {
      // Generate a base value for this country-indicator pair
      const baseValue = Math.random() * 1000 + 500;
      
      for (let year = 0; year <= yearsDiff; year++) {
        const date = new Date(start);
        date.setFullYear(start.getFullYear() + year);
        
        // Add some random variation to create realistic-looking trends
        const variation = (Math.random() - 0.5) * 100;
        const trend = year * (Math.random() * 50); // Upward trend over time
        
        mockData.push({
          Country: country,
          Category: indicator,
          DateTime: date.toISOString().split('T')[0],
          Value: baseValue + variation + trend
        });
      }
    });
  });

  return mockData;
};

export const getComparisonData = async (
  countries: string[],
  indicators: string[],
  startDate = "2015-01-01",
  endDate = "2015-12-31"
): Promise<TEDataPoint[]> => {
  const countriesParam = countries.map(encodeURIComponent).join(",");
  const indicatorsParam = indicators.map(encodeURIComponent).join(",");
  const url = `${API_BASE}/historical/country/${countriesParam}/indicator/${indicatorsParam}/${startDate}/${endDate}?c=${API_KEY}`;

  try {
    const { data } = await axios.get<TEDataPoint[]>(url);
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 409) {
      console.warn('API rate limit reached, using mock data');
      return generateMockData(countries, indicators, startDate, endDate);
    }
    throw error;
  }
};

export const getIndicators = (): string[] => [
  "GDP",
  "GDP Growth Rate",
  "Unemployment Rate",
  "Inflation Rate"
];
