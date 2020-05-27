import { Parser } from '../src/Parser';

describe('Parser', () => {
	it('should load component json correctly', () => {
		const parser = new Parser();
		parser.load({});
		expect(parser.currentSetup()).toEqual({});
	});
});
