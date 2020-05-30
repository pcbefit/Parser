import { LEVEL } from './type';

class Parser {
	constructor() {
		this._currentSetup = {
			motherboard: null,
			CPU: null,
			cooler: null,
			GPU: [],
			ram: [],
			SSD: [],
			hardDrive: [],
			ROM: [],
			case: null,
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

	checkSetup(){
		return false;
	}

	setCPU(CPU){
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, CPU };
	}

	setGPU(GPU){
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, GPU };
	}

	setHardDrive(hardDrive){
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, hardDrive };
	}

	setSSD(SSD){
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, SSD };
	}

	setROM(ROM){
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, ROM };
	}

	setMotherboard(motherboard){
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, motherboard };
	}

	setRam(ram){
		const oldSetup = this._currentSetup;
		this._currentSetup = { ...oldSetup, ram };
	}

	get CPU(){
		return this._currentSetup.CPU;
	}

	getLevel(component){
		const standard = this._levelStandard[component.type];

		if(component.score < standard.B){
			return LEVEL.E;
		} else if(component.score < standard.G){
			return LEVEL.B;
		} else if(component.score < standard.W){
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
