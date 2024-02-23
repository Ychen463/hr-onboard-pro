module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    // 'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-console': 'off',
    // Adjust or add this rule
    'import/extensions': ['error', 'ignorePackages', {
      js: 'always', // or 'never' depending on your preference
      jsx: 'always',
      ts: 'always',
      tsx: 'always',
    }],
    // Allow absolute paths
    'import/no-absolute-path': 'off',
    // You might need to adjust or disable this rule if your build tool handles resolution
    'import/no-unresolved': 'off',
  },
}
