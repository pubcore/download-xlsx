[![Build Status](https://travis-ci.org/pubcore/download-xlsx.svg?branch=master)](https://travis-ci.org/pubcore/download-xlsx)

### Download xlsx file

#### Install

	npm install @pubcore/download-xlsx --save

#### usage

simple example:

	import downloadXlsx from '@pubcore/download-xlsx'

	downloadXlsx({
		cols: ['column1','column2','column3'].map(c => ({'name': c})),
		rows: [
			{column1:'value 1', column2: 'lorem ipsum dolor sit amet', column3: '4.23'},
			{column1:'value 2', column2: 'foo bar', column3: 0.23},
			{column1:'value 3', column2: 'foobar', column3: ''}
		],
		//default is 't' (text), https://github.com/SheetJS/js-xlsx#data-types
		types:{column3:'n'}, //(use number format for values in column3)
		filename: 'example.xlsx'
	})

## codepen example
https://codepen.io/pubcore/pen/XqazyV
