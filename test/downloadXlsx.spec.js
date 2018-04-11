import {expect} from 'chai'
import downloadXlsx from '../src/downloadXlsx'

describe('downloadXlsx ' + new Date(), () => {
	it('is available', () => {
		expect(downloadXlsx).not.to.be.null
	})

})
