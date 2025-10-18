import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountrySelector from "./components/CountrySelector";
import ComparisonTable from "./components/ComparisonTable";
import InsightCard from "./components/InsightCard";
import IndicatorChart from "./components/IndicatorChart";
import { getComparisonData, getIndicators, type TEDataPoint } from "./api/teClient";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

// FIXME: Currently using a small set for demo. Expand this later with more diverse economies
const countries = [
  "New Zealand", // Clean and green economy
  "Mexico",      // Manufacturing powerhouse
  "Sweden",      // Innovation leader
  "Thailand"     // Emerging market dynamo
];

// TODO: Make these configurable via date picker
const startDate = "2010-01-01";  // Post-financial crisis baseline
const endDate = "2023-12-31";    // Current economic cycle

// Utility functions for data formatting
const formatLargeCurrency = (value: number): string => {
  if (value >= 1e12) return `${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  return value.toLocaleString();
};

interface ComparisonData {
  [key: string]: {
    a: number | undefined;  // Using 'a' to match ComparisonTable expectations
    b: number | undefined;  // Using 'b' to match ComparisonTable expectations
  };
}

const App: React.FC = () => {
  // Core data state
  const [selectedCountries, setSelectedCountries] = useState<[string, string]>(["", ""]);
  const [comparisonResults, setComparisonResults] = useState<ComparisonData>({});
  const [timeSeriesData, setTimeSeriesData] = useState<{ [key: string]: TEDataPoint[] }>({});
  
  // UI state
  const [insights, setInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);  // Better than isMockData
  
  // Available indicators
  const indicators = getIndicators();

  // Handler for country selection
  const handleCountrySelect = (index: number, value: string) => {
    const updatedSelection = [...selectedCountries] as [string, string];
    updatedSelection[index] = value;
    setSelectedCountries(updatedSelection);
    setComparisonResults({}); // Reset results when selection changes
  };

  // NOTE: Main data fetching logic - handles both real and demo data
  const fetchComparisonData = async () => {
    const [sourceCountry, targetCountry] = selectedCountries;
    if (!sourceCountry || !targetCountry) return;

    setIsLoading(true);
    setIsDemoMode(false);

    try {
      // FIXME: Sometimes returns stale data - might need cache busting
      const result = await getComparisonData(
        [sourceCountry, targetCountry], 
        indicators, 
        startDate, 
        endDate
      );

      // Check if we're getting demo data based on response pattern
      const expectedDemoDataLength = countries.length * indicators.length *
        (new Date(endDate).getFullYear() - new Date(startDate).getFullYear() + 1);
      const isUsingDemoData = result.length === expectedDemoDataLength;
      setIsDemoMode(isUsingDemoData);

      // Transform raw data into comparison format
      const comparisonData: ComparisonData = {};
      indicators.forEach(indicator => {
        const sourceData = result.find(r => r.Country === sourceCountry && r.Category === indicator);
        const targetData = result.find(r => r.Country === targetCountry && r.Category === indicator);
        comparisonData[indicator] = {
          a: sourceData?.Value,
          b: targetData?.Value,
        };
      });
      setComparisonResults(comparisonData);

      // Process historical data for charts
      const historicalData: { [key: string]: TEDataPoint[] } = {};
      result.forEach(point => {
        if ([sourceCountry, targetCountry].includes(point.Country)) {
          const key = `${point.Country}-${point.Category}`;
          if (!historicalData[key]) {
            historicalData[key] = [];
          }
          historicalData[key].push(point);
        }
      });
      setTimeSeriesData(historicalData);

      // Generate narrative insights
      let analysisPoints = indicators.map(indicator => {
        const targetValue = comparisonData[indicator].b;
        const sourceValue = comparisonData[indicator].a;

        if (targetValue === undefined || sourceValue === undefined) {
          return `${indicator} data unavailable for comparison.`;
        }

        const difference = ((targetValue - sourceValue) / sourceValue) * 100;
        const trend = difference > 0 ? 'higher' : 'lower';

        return `${targetCountry}'s ${indicator} is ${Math.abs(difference).toFixed(1)}% ${trend} ` +
               `than ${sourceCountry}'s (${formatLargeCurrency(targetValue)} vs ${formatLargeCurrency(sourceValue)})`;
      });

      if (isUsingDemoData) {
        analysisPoints = [
          "🔍 Demo Mode: Using simulated data for development (API rate limit).",
          "💡 Trends and patterns are representative, but exact values are approximated.",
          ...analysisPoints
        ];
      }
      
      setInsights(analysisPoints);
    } catch (error) {
      console.error('Error fetching data:', error);
      setInsights(['Error fetching data. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-['Inter']">
      <div className="max-w-6xl mx-auto p-6">
        {isDemoMode && (
          <motion.div
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.485 2.495c.873-1.512 3.157-1.512 4.03 0l8.485 14.697c.873 1.512-.218 3.408-2.015 3.408H2.015c-1.797 0-2.888-1.896-2.015-3.408L8.485 2.495zM10 5a1 1 0 011 1v6a1 1 0 11-2 0V6a1 1 0 011-1zm0 9a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  API rate limit reached. Using sample data for demonstration purposes.
                </p>
              </div>
            </div>
          </motion.div>
        )}
        <motion.h1
          className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Trade Sight
          <span className="block text-lg font-normal text-gray-600 mt-2">
            Country Comparison Dashboard
          </span>
        </motion.h1>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CountrySelector countries={countries} onSelect={handleCountrySelect} />
          <motion.button
            onClick={fetchComparisonData}
            disabled={!selectedCountries[0] || !selectedCountries[1] || isLoading}
              className={`w-full mt-4 py-3 rounded-xl font-semibold text-white transition-all transform hover:scale-[1.02] ${!selectedCountries[0] || !selectedCountries[1]
                ? 'bg-gray-400'
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
              }`}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Comparing...
              </span>
            ) : (
              'Compare Countries'
            )}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {Object.keys(comparisonResults).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ComparisonTable
                indicators={indicators}
                data={comparisonResults}
              />
              {/* Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {indicators.map(indicator => {
                  if (!selectedCountries[0] || !selectedCountries[1]) return null;
                  return (
                    <IndicatorChart
                      key={indicator}
                      title={indicator}
                      countryA={selectedCountries[0]}
                      countryB={selectedCountries[1]}
                      dataA={timeSeriesData[`${selectedCountries[0]}-${indicator}`] || []}
                      dataB={timeSeriesData[`${selectedCountries[1]}-${indicator}`] || []}
                    />
                  );
                })}
              </div>
              <InsightCard insights={insights} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        * Data shown for 2015 (demo mode – limited by free API plan)
      </p>
    </div>
  );
};

export default App;
