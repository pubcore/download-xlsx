import downloadXlsx from '../src/index'
import {equal} from 'assert'

describe('downloadXlsx ' + new Date(), () => {
	it('is available', () => {
		equal(!downloadXlsx, false)
	})
})
