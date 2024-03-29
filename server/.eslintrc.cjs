module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    quotes: ['error', 'single'],
    'no-console': 'off',
    // Adjust or add this rule
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always', // or 'never' depending on your preference
        jsx: 'always',
        ts: 'always',
        tsx: 'always',
      },
    ],
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
  },
};
