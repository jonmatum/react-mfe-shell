/**
 * Auto-generated metrics
 * Generated on: 2025-08-26T00:43:17.054Z
 * DO NOT EDIT MANUALLY - Run 'npm run generate:metrics' to update
 */

export const METRICS = {
  "generated": "2025-08-26T00:43:17.054Z",
  "version": "8.1.1",
  "bundle": {
    "esm": {
      "size": 155068,
      "sizeFormatted": "151.4KB",
      "gzipped": 30126,
      "gzippedFormatted": "29.4KB"
    },
    "cjs": {
      "size": 164816,
      "sizeFormatted": "161KB",
      "gzipped": 30821,
      "gzippedFormatted": "30.1KB"
    },
    "css": {
      "size": 49326,
      "sizeFormatted": "48.2KB",
      "gzipped": 8538,
      "gzippedFormatted": "8.3KB"
    },
    "standalone": {
      "size": 12505,
      "sizeFormatted": "12.2KB",
      "gzipped": 2850,
      "gzippedFormatted": "2.8KB"
    },
    "types": {
      "size": 83365,
      "sizeFormatted": "81.4KB"
    }
  },
  "tests": {
    "totalTests": 0,
    "testFiles": 0,
    "coverage": 0,
    "passRate": 100
  },
  "dry": {
    "score": 9.8,
    "scoreFormatted": "9.8/10",
    "componentsAnalyzed": 22,
    "targetScore": 8.5
  },
  "code": {
    "totalFiles": 158,
    "totalLines": 25966,
    "complexity": 0,
    "commentRatio": 0
  },
  "scc": {
    "estimatedCost": 443856,
    "estimatedCostFormatted": "$443,856",
    "scheduleMonths": 10.1,
    "scheduleMonthsFormatted": "10.10 months",
    "peopleRequired": 3.9,
    "peopleRequiredFormatted": "3.90 devs",
    "totalLines": 18734,
    "codeLines": 14380,
    "bytesProcessed": 526174,
    "model": "COCOMO (organic)",
    "disclaimer": "Estimates based on COCOMO model analysis of production code"
  }
} as const;

export type MetricsData = typeof METRICS;
