export interface IndicatorData {
  Country: string;
  Category: string;
  DateTime: string;
  Value: number;
}

export interface ComparisonData {
  a?: number | null;
  b?: number | null;
}

export type IndicatorsMap = Record<string, ComparisonData>;
