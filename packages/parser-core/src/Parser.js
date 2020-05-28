class Parser {
	constructor() {
		this._currentSetup = {
			motherboard: null,
			CPU: null,
			GPU: [],
			ram: [],
			SSD: [],
			hardDrive: [],
			ROM: [],
		};
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

	currentSetup() {
		return this._currentSetup;
	}
}

export { Parser };
