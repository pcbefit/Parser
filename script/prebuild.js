const fs = require('fs');
const path = require('path');

const packages = ['parser-core'];
const files = ['LICENSE', 'README.md'];

packages.forEach(packageName => {
	files.forEach(file => {
		fs.copyFile(path.join(process.cwd(), file), path.join(process.cwd(), 'packages', packageName, file), (err) => {
			if (err) throw err;
			console.log(`Copy ${file} to ${packageName} finished`);
		});
	});
});