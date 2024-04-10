module.exports = {
	env: {
	  browser: true,
	  es2021: true
	},
	extends: [
	  'plugin:react/recommended',
	  'standard',
	  'eslint:recommended',
	  'prettier',
	  'next'
	],
	overrides: [
	],
	parserOptions: {
	  ecmaVersion: 'latest',
	  sourceType: 'module'
	},
	plugins: [
	  // 'react',
	  'prettier'
	],
	rules: {
	  'react/prop-types': 0,
	  // indent: ['error', 'tab'],
	  "react/react-in-jsx-scope": "off",
	  "react/display-name": "off",
	  "react/prop-types": 0,
	  "indent": ["error", "tab"],
	  "linebreak-style": ["error", "unix"], //'unix'
	  "quotes": ["error", "single"],
	  "semi": ["error", "never"],
	  "no-debugger": "off"
	}
  }
  