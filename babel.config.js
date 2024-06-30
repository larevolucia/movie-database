module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-transform-private-methods",
    "@babel/plugin-transform-class-properties",
    "@babel/plugin-transform-numeric-separator",
    "@babel/plugin-transform-nullish-coalescing-operator",
    "@babel/plugin-transform-optional-chaining"
  ]
};
