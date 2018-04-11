'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//@see Common Spreadsheet Format
exports.default = function (_ref) {
	var rows = _ref.rows,
	    cols = _ref.cols,
	    filename = _ref.filename,
	    map = _ref.map,
	    formats = _ref.formats,
	    types = _ref.types;
	var utils = _xlsx2.default.utils,
	    write = _xlsx2.default.write,
	    book_new = utils.book_new,
	    encode_cell = utils.encode_cell,
	    book_append_sheet = utils.book_append_sheet,
	    encode_range = utils.encode_range,
	    sheet,
	    range = { s: { c: 0, r: 0 }, e: { c: cols.length, r: rows.length } },
	    book = book_new(),
	    type = cols.reduce(function (acc, _ref2) {
		var name = _ref2.name;
		return (acc[name] = types && types[name] || 's') && acc;
	}, {}),
	    format = cols.reduce(function (acc, _ref3) {
		var name = _ref3.name;
		return (acc[name] = formats && formats[name] || '@') && acc;
	}, {});

	//head row

	sheet = cols.reduce(function (acc, _ref4, index) {
		var name = _ref4.name;

		acc[encode_cell({ c: index, r: 0 })] = { t: 's', v: name, z: '@' };
		return acc;
	}, {});

	//data rows
	rows.forEach(function (row, rowIndex) {
		cols.forEach(function (_ref5, colIndex) {
			var name = _ref5.name;

			var key = encode_cell({ c: colIndex, r: rowIndex + 1 }),
			    v = type[name] === 'n' ? +row[name] : map ? map(row[name], name, row) : row[name];
			if (isNaN(v) && type[name] === 'n' || v === null) {
				sheet[key] = {
					t: 's',
					v: ''
					//z:format[name]
				};
			} else {
				sheet[key] = {
					t: type[name],
					v: v,
					z: format[name]
				};
			}
		});
	});

	sheet['!ref'] = encode_range(range);
	book_append_sheet(book, sheet, 'sheet1');
	saveBlob(new Blob([toArrayBuf(write(book, { bookType: 'xlsx', type: 'binary' }))], { type: 'application/octet-stream' }), filename.replace(/.[^.]{2,4}$/, '') + '.xlsx');
};

function toArrayBuf(s) {
	var buf = new ArrayBuffer(s.length),
	    view = new Uint8Array(buf);
	for (var i = 0; i < s.length; i++) {
		view[i] = s.charCodeAt(i) & 0xFF;
	}
	return buf;
}

function saveBlob(blob, fileName) {
	if (navigator.msSaveBlob) {
		navigator.msSaveBlob(blob, fileName);
	} else if (window.URL) {
		var url = URL.createObjectURL(blob);
		var anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = fileName;
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		anchor.dispatchEvent(event);
	}
}