import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

// The data to be used in the templates
const data = { name: 'Hello Wendy' };

// Function to compile Handlebars template files
function compileTemplate(filePath) {
	const source = fs.readFileSync(filePath, 'utf-8');
	const template = Handlebars.compile(source);
	return template(data);
}

// Recursive function to read through all folders and subfolders
function processDirectory(directory) {
	fs.readdirSync(directory, { withFileTypes: true }).forEach((dirent) => {
		const fullPath = path.join(directory, dirent.name);
		if (dirent.isDirectory()) {
			processDirectory(fullPath); // Recurse into subdirectories
		} else if (dirent.isFile() && path.extname(dirent.name) === '.hbs') {
			// Compile Handlebars template and write to a new file
			const output = compileTemplate(fullPath);
			const newFilePath = fullPath.replace(/\.hbs$/, '');
			fs.writeFileSync(newFilePath, output);
			console.log(`Generated file: ${newFilePath}`);
		}
	});
}

// Start processing from a root directory (adjust this to your root directory)
const rootDirectory = '.';
processDirectory(rootDirectory);
