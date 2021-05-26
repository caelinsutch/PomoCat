module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/extensions": 0,
    "react/prop-types": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    " @typescript-eslint/ban-ts-comment": "off",
  },
};
