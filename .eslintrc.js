module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: 'airbnb',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'no-tabs': 0,
		'react/jsx-indent': [
			0,
			'tab',
			{ checkAttributes: true, indentLogicalExpressions: true },
		],
		'react/jsx-indent-props': [0, 'tab'],
		'react/forbid-prop-types': [
			0,
			{
				forbid: ['any'],
				checkContextTypes: true,
				checkChildContextTypes: true,
			},
		],
		'react/require-default-props': [0, { forbidDefaultForRequired: true }],
		'implicit-arrow-linebreak': 0,
		'function-paren-newline': 0,
		'react/no-array-index-key': 0,
		'no-nested-ternary': 0,
		indent: 0,
		'jsx-quotes': 0,
		'arrow-parens': 0,
		'wrap-iife': 0,
	},
};
