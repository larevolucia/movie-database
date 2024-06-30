module.exports = {
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)" // Add any other modules you need to transform here
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  testEnvironment: "jsdom", // Ensure this is set correctly
  moduleFileExtensions: ["js", "jsx"],
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "jest-css-modules"
  }
};
