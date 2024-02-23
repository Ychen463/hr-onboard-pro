module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
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
    'no-console': 'off',
    // Adjust or add this rule
    'import/extensions': ['error', 'ignorePackages', {
      js: 'always', // or 'never' depending on your preference
      jsx: 'always',
      ts: 'always',
      tsx: 'always',
    }],
  },
};