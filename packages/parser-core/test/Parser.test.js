import { Parser } from '../src/Parser';
import { AMD_CORE, AMD_SOCKET, COMPONENT, LEVEL, PLATFORM } from '../src/type';
import { INTEL_GPU } from '../src/type/gpuCore';

describe('Parser', () => {
	let parserA = null;
	let parserB = null;

	beforeEach(() => {
		parserA = new Parser();
		parserB = new Parser();

		parserA.load({
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
			GPU: [{
				name: 'Iris Plus Graphics 655',
				core: INTEL_GPU,
				type: COMPONENT.GPU,
				score: 400,
				fits: [],
				wattage: 28,
			}],
			ram: [],
			SSD: [],
			hardDrive: [],
			ROM: [],
			chassis: null,
			cooler: null,
		});

		parserA.setLevelStandard({
			CPU: {
				B: 500,
				W: 2000,
				G: 900,
			},
		});
	});

	afterEach(() => {
		parserA = null;
		parserB = null;
	});

	it('should load component json correctly', () => {
		parserA.load({});
		parserB.load({});
		expect(parserA.currentSetup()).toEqual({});
		expect(parserB.currentSetup()).toEqual({});
	});

	it('should get component level correctly', () => {
		const cpuLevel = parserA.getLevel(parserA.CPU);

		expect(cpuLevel).toEqual(LEVEL.G);

		const gpuLevel = parserA.getLevel(parserA.GPU);

		expect(gpuLevel).toEqual(LEVEL.M);
	});

	it('should find mismatch setup', function () {
		const mismatch = parserA.checkSetupMismatch();

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
			{
				name: 'Iris Plus Graphics 655',
				core: INTEL_GPU,
				type: COMPONENT.GPU,
				score: 400,
				fits: [],
				wattage: 28,
			},
		]));
	});
});
