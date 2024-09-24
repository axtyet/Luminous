import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
	{
		input: 'src/BiliBili.Enhanced.response.beta.js',
		output: {
			file: 'js/BiliBili.Enhanced.response.beta.js',
			format: 'es',
			banner: "/* README: https://github.com/BiliUniverse */\nconsole.log('📺 BiliBili: ⚙️ Enhanced β Response')",
		},
		plugins: [json(), commonjs(), nodeResolve()]
	},
	{
		input: 'src/BiliIntl.Enhanced.response.beta.js',
		output: {
			file: 'js/BiliIntl.Enhanced.response.beta.js',
			format: 'es',
			banner: "/* README: https://github.com/BiliUniverse */\nconsole.log('📺 BiliIntl: ⚙️ Enhanced β Response')",
		},
		plugins: [json(), commonjs(), nodeResolve()]
	},
];
