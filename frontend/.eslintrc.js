module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:jest/recommended',
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
  plugins: ['react', 'react-hooks', 'jest'],
  rules: {
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'no-use-before-define': 'off',
    'max-len': [
      'error',
      { code: 80, ignoreUrls: true, ignoreStrings: true, tabWidth: 2 },
    ],
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
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'no-unused-vars': 'off',
    semi: 'warn',
    'quote-props': 'off',
    camelcase: 'off',
    '@typescript/no-empty-function': 'off',
    'object-curly-spacing': 'off',
    'import/no-extraneous-dependencies': 'off',
    'implicit-arrow-linebreak': 'off',
    indent: 'off',
    'no-confusing-arrow': 'off',
    'function-paren-newline': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/self-closing-comp': 'warn',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    jest: { version: '27.0.1' },
  },
  overrides: [
    // typescript
    {
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      files: [
        '*.ts', 
        '*.tsx'
      ],
      excludedFiles: [
        '*.test.js',
        '*.js'
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': [
          'warn',
          {
            fixToUnknown: true,
            ignoreRestArgs: true,
          },
        ],
      }
    }
  ]
};
