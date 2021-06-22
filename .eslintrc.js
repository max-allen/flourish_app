const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: { jsx: true }
  },
  plugins: [
    'react',
    'react-hooks'
  ],
  rules: {
    camelcase: ERROR,
    semi: [ERROR, 'never'],
    'no-alert': OFF,
    'class-methods-use-this': OFF,
    'arrow-parens': [ERROR, 'as-needed'],
    'global-require': OFF,
    'no-underscore-dangle': OFF,
    'no-unreachable': ERROR,
    'no-restricted-syntax': [ERROR, {
      selector: 'ExportDefaultDeclaration',
      message: 'Use named exports, please.'
    }],
    'comma-dangle': [ERROR, 'never'],
    'object-curly-newline': OFF,
    'import/prefer-default-export': OFF,
    'import/no-anonymous-default-export': [ERROR, {
      allowArray: false,
      allowArrowFunction: false,
      allowAnonymousClass: false,
      allowAnonymousFunction: false,
      allowCallExpression: false,
      allowLiteral: false,
      allowObject: false
    }],
    'import/no-unresolved': OFF,
    'import/extensions': OFF,
    'import/no-extraneous-dependencies': OFF,
    'no-param-reassign': OFF,
    'no-console': ERROR,
    'consistent-return': OFF,
    'no-confusing-arrow': [ERROR, { allowParens: true }],
    'max-len': [ERROR, {
      code: 150,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreRegExpLiterals: true
    }],
    'prefer-destructuring': [ERROR, {
      object: true,
      array: false
    }],
    'react/jsx-props-no-spreading': OFF,
    'react/no-unknown-property': ERROR,
    'react/prop-types': OFF,
    'react/no-multi-comp': [OFF, { ignoreStateless: true }],
    'jsx-quotes': [ERROR, 'prefer-single'],
    'jsx-a11y/label-has-for': [ERROR, {
      required: { every: ['id'] },
      allowChildren: false
    }],
    'jsx-a11y/anchor-is-valid': [ERROR, {
      components: []
    }],
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,
    'jsx-a11y/no-noninteractive-element-to-interactive-role': OFF,
    'jsx-a11y/label-has-associated-control': [ERROR, {
      assert: 'either',
      allowChildren: false,
      level: 3
    }],
    'react/sort-comp': OFF,
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'no-use-before-define': OFF,
    'react/jsx-one-expression-per-line': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF
  }
}
