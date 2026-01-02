
import { MetricResult } from '@/context/DashboardContext';

export interface ChartDataPoint {
  name: string;
  value: number;
}

export function transformMetricsToChartData(metrics: MetricResult[] | undefined): ChartDataPoint[] {
  if (!metrics || metrics.length === 0) {
    return [];
  }

  // Find the metric with the highest importance that has valid data
  // Sort by importance descending
  const sortedMetrics = [...metrics].sort((a, b) => (b.importance || 0) - (a.importance || 0));

  for (const metric of sortedMetrics) {
    if (metric.data && metric.data.labels && metric.data.values && 
        metric.data.labels.length === metric.data.values.length && 
        metric.data.labels.length > 0) {
      
      return metric.data.labels.map((label, index) => ({
        name: label,
        value: metric.data.values[index]
      }));
    }
  }

  return [];
}
