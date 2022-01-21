module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    "plugin:jest/recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'jest'],
  rules: {
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'max-len': ['warn', { code: 80 }],
    'operator-linebreak': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': ['warn', {
      fixToUnknown: true,
      ignoreRestArgs: true,
    }],
    'react/self-closing-comp': 'warn',
    'semi': 'warn',
    'quote-props': 'off',
    'camelcase': 'off',
    '@typescript/no-empty-function': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',
    'object-curly-spacing': 'off',
    'import/no-extraneous-dependencies': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/jsx-one-expression-per-line': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
