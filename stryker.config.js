/** @type {import('@stryker-mutator/api/core').StrykerOptions} */
// module.exports = {
//   mutate: ["validators/**/*.js"], // Files to mutate
//   mutator: "javascript",
//   packageManager: "npm",
//   reporters: ["clear-text", "html"], 
//   testRunner: "jest",
//   jest: {
//     projectType: "custom",
//     config: require("./jest.config.js"),
//   },
//   coverageAnalysis: "off",
// };
// stryker.config.js
// module.exports = {
//   mutate: ["validators/**/*.js"],        // only mutate validator source files
//   mutator: "javascript",
//   packageManager: "npm",
//   reporters: ["clear-text", "html"],
//   testRunner: "jest",
//   jest: {
//     projectType: "custom",
//     config: require("./jest.config.js")
//   },

//   // Ensure Stryker loads both the source and the tests so Jest will execute them.
//   // 'files' is not what is mutated (mutate covers that) — it ensures test discovery.
//   files: [
//     "validators/**/*.js",
//     "tests/**/*.test.js",
//     "tests/**/*.spec.js",
//     "package.json",
//     "jest.config.js"
//   ],

//   // Use perTest coverage analysis for best results (or switch to "off" if you have
//   // a setup that doesn't support perTest).
//   coverageAnalysis: "perTest"
// };
module.exports = {
  mutate: ['validators/**/*.js'], // only mutate validator source files
  mutator: 'javascript',
  packageManager: 'npm',

  // Reporters: clear-text for console, html for a browsable report
  reporters: ['clear-text', 'progress', 'html'],

  testRunner: 'jest',
  jest: {
    projectType: 'custom',
    // let Stryker read your jest config file
    configFile: 'jest.config.js'
  },

  // Ensure Stryker loads both the source and the tests so Jest will execute them.
  files: [
    'validators/**/*.js',
    'tests/**/*.test.js',
    'tests/**/*.spec.js',
    'package.json',
    'jest.config.js'
  ],

  // Use perTest coverage analysis for best result mapping (requires deterministic tests)
  coverageAnalysis: 'perTest',

  // Give Stryker a larger timeout for slower machines / CI
  timeoutMS: 120000,

  // Optional: where to write the HTML report. Stryker will create reports/mutation by default.
  htmlReporter: {
    baseDir: 'reports/mutation'
  }
};
