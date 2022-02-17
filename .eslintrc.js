const path = require('path');

module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'jest'],
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'import/prefer-default-export': 'warn',
    'prefer-destructuring': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    'react/react-in-jsx-scope': 'warn',
    '@typescript-eslint/no-use-before-define': 'warn',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-array-index-key': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    'no-console': 'warn',
    'consistent-return': ['warn', { treatUndefinedAsUnspecified: true }],
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'import/no-named-as-default': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'no-param-reassign': 'warn',
    'no-plusplus': 'warn',
    'jsx-a11y/label-has-associated-control':'warn',
    'import/extensions': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
