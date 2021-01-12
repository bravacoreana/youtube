module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "no-console": "off",
    "import/prefer-default-export": "off",
    "no-use-before-define": ["error", { functions: false, classes: false }],
  },
  ignorePatterns: ["node_modules/"],
};
