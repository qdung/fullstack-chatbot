module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the project
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "node", "promise", "unicorn"],
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:node/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  env: {
    node: true, // Enable Node.js global variables
    jest: true, // Enable Jest global variables
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
    "unicorn/filename-case": ["error", { case: "kebabCase" }],
    "import/prefer-default-export": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "node/no-missing-import": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
      },
    },
  },
};
