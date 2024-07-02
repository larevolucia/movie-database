module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest" // Transform JavaScript/JSX files using babel-jest
  },
  testEnvironment: "jsdom", // Set the test environment to jsdom
  moduleFileExtensions: ["js", "jsx"], // Include JavaScript extensions
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"], // Include patterns for JavaScript test files
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy" // Use identity-obj-proxy for CSS module mocking
    // "^axios$": require.resolve("axios")
  }
};
