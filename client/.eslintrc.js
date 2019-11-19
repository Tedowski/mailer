module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "indent": ["error", 4],
    "react/jsx-indent" : ["error", 4],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": [0],
    "react/button-has-type": [0],
    "semi-style": ["error", "last"],
    "semi": ["error", "always"],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "always",
      "asyncArrow": "always"
    }],
    "no-unused-expressions": "off",
    "function-paren-newline": "off",
  },
  "overrides": [
    {
      "files": ["*.test.js","*.spec.js"],
      "rules": {
        "no-undef": "off"
      }
    }
  ]
};
