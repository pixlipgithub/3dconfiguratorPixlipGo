
function glsl() {

	return {

		transform( code, id ) {

			if ( /\.glsl$/.test( id ) === false ) return;

			var transformedCode = 'export default ' + JSON.stringify(
				code
					.replace( /[ \t]*\/\/.*\n/g, '' ) // remove //
					.replace( /[ \t]*\/\*[\s\S]*?\*\//g, '' ) // remove /* */
					.replace( /\n{2,}/g, '\n' ) // # \n+ to \n
			) + ';';
			return {
				code: transformedCode,
				map: { mappings: '' }
			};

		}

	};

}

//import nodeResolve from 'rollup-plugin-node-resolve';
//import commonJs from 'rollup-plugin-commonjs';
//import {terser} from 'rollup-plugin-terser';

export default {
	input: 'src/main.js',
	plugins: [
		glsl(),
		//nodeResolve(),
		//commonJs()
		//terser()
	],
	// sourceMap: true,
	output: [
		{
			format: 'umd',
			name: 'generator',
			file: 'build/standgenerator.js',
			indent: '\t'
		}
	]
};