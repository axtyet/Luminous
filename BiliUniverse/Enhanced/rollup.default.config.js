import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";
import terser from '@rollup/plugin-terser';
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
	{
		input: 'src/BiliBili.Enhanced.response.js',
		output: {
			file: 'js/BiliBili.Enhanced.response.js',
			format: 'es',
			banner: "/* README: https://github.com/BiliUniverse */\nconsole.log('📺 BiliBili: ⚙️ Enhanced Response')",
		},
		plugins: [json(), commonjs(), nodeResolve(), terser()]
	},
	/*
	{
		input: 'src/BiliIntl.Enhanced.response.js',
		output: {
			file: 'js/BiliIntl.Enhanced.response.js',
			format: 'es',
		},
		plugins: [json(), commonjs(), nodeResolve(), terser()]
	},
	*/
];
