module.exports = {
  extends: "@istanbuljs/nyc-config-typescript",
  all: false,
  'check-coverage': true,
  include: ['src/**'],
  reporter: ['html', 'text'],
  'report-dir': './coverage',
  'temp-dir': './.nyc_output',
  branches: 50,
  functions: 75,
  lines: 75,
  statements: 90,
  watermarks: {
    branches: [35, 50],
    functions: [50, 75],
    lines: [50, 75],
    statements: [90, 97.5],
  },
};
