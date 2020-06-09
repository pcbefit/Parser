import { Parser } from '../src/Parser';
import { AMD_CORE, AMD_SOCKET, COMPONENT, LEVEL, PLATFORM } from '../src/type';

describe('Parser', () => {
	let parser = null;

	beforeEach(() => {
		parser = new Parser();

		parser.load({
			motherboard: {
				platform: PLATFORM.INTEL,
				type: COMPONENT.MOTHERBOARD,
			},
			CPU: {
				name: 'Ryzen 5 3600',
				core: AMD_CORE.RYZEN_5_3600,
				platform: PLATFORM.AMD,
				socket: AMD_SOCKET.AM4,
				wattage: 65,
				speed: 3.6,
				score: 1000,
				type: COMPONENT.CPU,
				fits: [],
			},
			GPU: [],
			ram: [],
			SSD: [],
			hardDrive: [],
			ROM: [],
			chassis: null,
			cooler: null,
		});

		parser.setLevelStandard({
			CPU: {
				B: 500,
				W: 2000,
				G: 900,
			},
		});
	});

	afterEach(() => {
		parser = null;
	});

	it('should load component json correctly', () => {
		parser.load({});
		expect(parser.currentSetup()).toEqual({});
	});

	it('should get component level correctly', () => {
		const cpuLevel = parser.getLevel(parser.CPU);

		expect(cpuLevel).toEqual(LEVEL.G);
	});

	it('should find mismatch setup', function () {
		const mismatch = parser.checkSetupMismatch();

		expect(mismatch.isMismatch).toEqual(true);
		expect(mismatch.mismatchComponents).toEqual(expect.arrayContaining([
			{
				name: 'Ryzen 5 3600',
				core: AMD_CORE.RYZEN_5_3600,
				platform: PLATFORM.AMD,
				socket: AMD_SOCKET.AM4,
				wattage: 65,
				speed: 3.6,
				score: 1000,
				type: COMPONENT.CPU,
				fits: [],
			},
			{
				platform: PLATFORM.INTEL,
				type: COMPONENT.MOTHERBOARD,
			},
		]));
	});
});
