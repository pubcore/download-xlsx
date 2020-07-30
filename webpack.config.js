module.exports = {
	mode: 'production',
	entry: './js/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'index.js',
		libraryTarget: 'var',
		library: 'pubcore',
		libraryExport: 'default'
	},
	performance:{
		maxAssetSize: 1024*1024,
		maxEntrypointSize: 1024*1024,
	}
}
