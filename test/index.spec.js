import {expect} from 'chai'
import downloadXlsx from '../src/index'

describe('downloadXlsx ' + new Date(), () => {
	it('is available', () => {
		expect(downloadXlsx).not.to.be.null
	})

})
