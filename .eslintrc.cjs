module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  parserOptions: { ecmaVersion: 8, sourceType: 'module' },
  ignorePatterns: ['node_modules/*', 'dist', '.eslintrc.cjs'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
        'import/resolver': {
          typescript: {},
        },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        // 'plugin:import/errors',
        // 'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
      ],
      plugins: [
        'eslint-plugin-react-compiler'
      ],
      rules: {
        'react-compiler/react-compiler': "error",
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 1 }],
        indent: ['error', 2, {SwitchCase: 1}],
        semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
        "object-curly-spacing": ["error", "always"],
        'linebreak-style': 0,
        'no-multiple-empty-lines': ["error", { "max": 2, "maxEOF": 1 }],
        'quotes': ["error", 'single', {allowTemplateLiterals: true}],
        'eol-last': ["error", "always"],
        'array-bracket-newline': ["error", { "multiline": true, "minItems": 3 }],
        'max-len': ["error", {
          "code": 120,
          "ignoreComments": true,
          "ignoreUrls": true,
          "ignoreStrings": true,
          "ignoreTemplateLiterals": true,
          "ignoreRegExpLiterals": true
        }],
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
            ],
            'newlines-between': 'never',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
        'import/no-unresolved': [2, { ignore: ['\\.svg$'] }],
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        "import/no-duplicates": ["error", {"prefer-inline": false}],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        'react/no-unknown-property': 'off',
        "react/react-in-jsx-scope": "off",
        "react/jsx-newline": [2, { "prevent": true, "allowMultilines": false }],
        "react/jsx-wrap-multilines": ["error", {
          "declaration": "parens-new-line",
           "assignment": "parens-new-line",
           "return": "parens-new-line",
           "arrow": "parens-new-line",
           "condition": "parens-new-line",
           "logical": "parens-new-line",
           "prop": "parens-new-line"
         }
        ],
        'react/jsx-no-comment-textnodes': 2,
        'react/jsx-max-props-per-line': [2, { "maximum": 1 }],
        "react/jsx-indent": [2, 2, {indentLogicalExpressions: true}],
        "react/jsx-first-prop-new-line": [2, 'multiline'],
        'react/jsx-indent-props': [2, { indentMode: 2, ignoreTernaryOperator: true} ],
        "react/jsx-closing-bracket-location": [2, 'line-aligned'],
        'react/jsx-one-expression-per-line': [2, {allow: "single-child"}],
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/consistent-type-assertions': ['off'],
      },
    },
  ],
}