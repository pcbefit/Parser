import { LEVEL } from './type';

class Parser {
	constructor() {
		this._ignoreNonCoreComponents = true;

		this._currentSetup = {
			motherboard: null,
			CPU: null,
			cooler: null,
			GPU: [],
			ram: [],
			SSD: [],
			hardDrive: [],
			ROM: [],
			chassis: null,
		};

		this._levelStandard = null;
	}

	setLevelStandard(standard) {
		this._levelStandard = standard;
	}

	load(component) {
		this._currentSetup = component;
	}

	getAutoSetup() {
		return this._currentSetup;
	}

	checkPlatformMismatch() {
		const { motherboard, CPU } = this._currentSetup;

		return !(CPU && motherboard && CPU.platform === motherboard.platform);
	}

	checkSetupMismatch() {
		const {
			motherboard,
			CPU,
			cooler,
			GPU,
			ram,
			SSD,
			hardDrive,
			chassis,
			ROM,
		} = this._currentSetup;

		let checkList = null,
			lastLevel = null,
			mismatchType = {},
			isMismatch = false;

		if (this._ignoreNonCoreComponents) {
			checkList = [motherboard, CPU, GPU, ram, SSD];
		} else {
			checkList = [
				motherboard,
				CPU,
				cooler,
				GPU,
				ram,
				SSD,
				hardDrive,
				chassis,
				ROM,
			];
		}

		for (let index = 0; index < checkList.length; ++index) {
			const component = checkList[index];
			const level = this.getLevel(component);
			if (!lastLevel) {
				lastLevel = level;
				continue;
			}

			if (level !== lastLevel) {
				isMismatch = true;

				mismatchType = {
					...mismatchType,
					[this.getType(checkList[index])]: true,
					[this.getType(checkList[index - 1])]: true,
				};
			}

			lastLevel = level;
		}

		if (this.checkPlatformMismatch()) {
			mismatchType = {
				...mismatchType,
				CPU: true,
				motherboard: true,
			};
		}

		let mismatchComponents = [];
		Object.keys(mismatchType).forEach((type) => {
			if (type !== 'undefined') {
				mismatchComponents.push(this._currentSetup[type]);
			}
		});

		const flattenArray = (data) => {

			const iter = (r, a) => {
				if (a === null) {
					return r;
				}
				if (Array.isArray(a)) {
					return a.reduce(iter, r);
				}
				return r.concat(a);
			};

			return data.reduce(iter, []);
		};

		mismatchComponents = flattenArray(mismatchComponents);

		return { isMismatch, mismatchComponents };
	}

	setCPU(CPU) {
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, CPU };
	}

	setGPU(GPU) {
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, GPU };
	}

	setHardDrive(hardDrive) {
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, hardDrive };
	}

	setSSD(SSD) {
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, SSD };
	}

	setROM(ROM) {
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, ROM };
	}

	setMotherboard(motherboard) {
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, motherboard };
	}

	setRam(ram) {
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, ram };
	}

	get CPU() {
		return this._currentSetup.CPU;
	}

	getType(components) {
		const multiComponents = components?.length;

		if (multiComponents) {
			return components[0].type;
		}

		return (components?.type);
	}

	getLevel(components) {
		const multiComponents = components?.length;

		if (multiComponents) {
			let lastLevel = null;
			for (const component of components) {
				const level = this.getComponentLevel(component);
				if (!lastLevel) {
					lastLevel = level;
					continue;
				}
				if (lastLevel !== level) {
					return LEVEL.M;
				} else {
					lastLevel = level;
				}
			}

			return lastLevel;
		}

		if (components?.type) {
			return this.getComponentLevel(components);
		} else {
			return LEVEL.M;
		}
	}

	getComponentLevel(component) {
		const standard = this._levelStandard[component.type];

		if (!standard) {
			return LEVEL.M;
		}

		if (component.score < standard.B) {
			return LEVEL.E;
		} else if (component.score < standard.G) {
			return LEVEL.B;
		} else if (component.score < standard.W) {
			return LEVEL.G;
		} else {
			return LEVEL.W;
		}
	}

	currentSetup() {
		return this._currentSetup;
	}
}

export { Parser };
