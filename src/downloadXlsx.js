import XLSX from 'xlsx'

//@see Common Spreadsheet Format
export default ({rows, cols, filename, map, formats, types}) => {
	var {utils, write} = XLSX,
		{book_new, encode_cell, book_append_sheet, encode_range} = utils,
		sheet,
		range = ({s: {c:0, r:0}, e: {c:cols.length, r:rows.length}}),
		book = book_new(),
		type = cols.reduce(
			(acc, {name}) => (acc[name] = types && types[name] || 's') && acc,
			{}
		),
		format = cols.reduce(
			(acc, {name}) => (acc[name] = formats && formats[name] || '@') && acc,
			{}
		)

	//head row
	sheet = cols.reduce(
		(acc, {name}, index) => {
			acc[encode_cell({c:index, r:0})] = {t:'s', v:name, z:'@'}
			return acc
		},
		{}
	)

	//data rows
	rows.forEach((row, rowIndex) => {
		cols.forEach(
			({name}, colIndex) => {
				var key = encode_cell({c:colIndex, r:rowIndex+1}),
					v = type[name] === 'n' ?
						+ row[name]
						: (map ? map(row[name], name, row) : row[name])
				if(isNaN(v) && type[name] === 'n' || v === null ){
					sheet[key] = {
						t:'s',
						v:'',
						//z:format[name]
					}
				}else{
					sheet[key] = {
						t:type[name],
						v,
						z:format[name]
					}
				}

			}
		)
	})

	sheet['!ref'] = encode_range(range)
	book_append_sheet(book, sheet, 'sheet1')
	saveBlob(
		new Blob(
			[toArrayBuf(write(book, {bookType:'xlsx', type:'binary'}))],
			{type:'application/octet-stream'}
		),
		filename.replace(/.[^.]{2,4}$/, '') + '.xlsx'
	)
}

function toArrayBuf(s) {
	var buf = new ArrayBuffer(s.length),
		view = new Uint8Array(buf)
	for (var i=0; i<s.length; i++){
		view[i] = s.charCodeAt(i) & 0xFF
	}
	return buf
}

function saveBlob(blob, fileName) {
	if(navigator.msSaveBlob) {
		navigator.msSaveBlob(blob, fileName)
	} else if(window.URL) {
		var url = URL.createObjectURL(blob)
		var anchor = document.createElement('a')
		anchor.href = url
		anchor.download = fileName
		var event = document.createEvent('MouseEvents')
		event.initEvent('click', true, true)
		anchor.dispatchEvent(event)
	}
}
