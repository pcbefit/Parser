import { Parser } from '../src/Parser';
import { AMD_SOCKET, COMPONENT, LEVEL, PLATFORM } from '../src/type';

describe('Parser', () => {

	let parser = null;

	beforeEach(() => {
		parser = new Parser();
	});

	afterEach(() => {
		parser = null;
	});

	it('should load component json correctly', () => {
		parser.load({});
		expect(parser.currentSetup()).toEqual({});
	});

	it('should get component level correctly', () => {
		parser.load({
			motherboard: null,
			CPU: {
				name: 'Ryzen 5 3600',
				platform: PLATFORM.AMD,
				socket: AMD_SOCKET.AM4,
				wattage: 65,
				speed: 3.6,
				score: 1000,
				type: COMPONENT.CPU,
			},
			GPU: [],
			ram: [],
			SSD: [],
			hardDrive: [],
			ROM: [],
		});

		parser.setLevelStandard({
			CPU: {
				B: 500,
				W: 2000,
				G: 900
			},
		});

		const cpuLevel = parser.getLevel(parser.CPU);

		expect(cpuLevel).toEqual(LEVEL.G);
	});
});
