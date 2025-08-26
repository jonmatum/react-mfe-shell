/**
 * Auto-generated metrics
 * Generated on: 2025-08-26T01:09:11.361Z
 * DO NOT EDIT MANUALLY - Run 'npm run generate:metrics' to update
 */

export const METRICS = {
  "generated": "2025-08-26T01:09:11.361Z",
  "version": "8.1.1",
  "bundle": {
    "esm": {
      "size": 155326,
      "sizeFormatted": "151.7KB",
      "gzipped": 30228,
      "gzippedFormatted": "29.5KB"
    },
    "cjs": {
      "size": 165074,
      "sizeFormatted": "161.2KB",
      "gzipped": 30917,
      "gzippedFormatted": "30.2KB"
    },
    "css": {
      "size": 49973,
      "sizeFormatted": "48.8KB",
      "gzipped": 8580,
      "gzippedFormatted": "8.4KB"
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
    "totalTests": 666,
    "testFiles": 28,
    "coverage": 75.05,
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
    "totalLines": 26190,
    "complexity": 0,
    "commentRatio": 0
  },
  "scc": {
    "estimatedCost": 453259,
    "estimatedCostFormatted": "$453,259",
    "scheduleMonths": 10.18,
    "scheduleMonthsFormatted": "10.18 months",
    "peopleRequired": 3.95,
    "peopleRequiredFormatted": "3.95 devs",
    "totalLines": 19100,
    "codeLines": 14670,
    "bytesProcessed": 539270,
    "model": "COCOMO (organic)",
    "disclaimer": "Estimates based on COCOMO model analysis of production code"
  }
} as const;

export type MetricsData = typeof METRICS;
