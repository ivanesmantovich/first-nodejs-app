// console.log(__dirname);

// const firstModule = require('./firstModule');
// console.log(firstModule);

// const os = require('os');
// console.log(os.platform(), os.homedir());

import fs from 'fs';

// Чтение файлов
// fs.readFile('files/firstFile.txt', (error, data) => {
//     if (error) console.log(error);
//     else console.log(data.toString());
// })

let data = fs.readFileSync('files/firstFile.txt');
console.log(data.toString());

// Запись файлов
fs.writeFile(
	'files/firstFile.txt',
	'Hello there. This is the First File of the three known files. Boop.',
	() => {
		console.log('File was written');
		fs.readFile('files/firstFile.txt', (error, data) => {
			if (error) console.log(error);
			else console.log(data.toString());
		});
	}
);
fs.writeFile('./files/fourthFile.txt', 'FOUR', () => {
	console.log('New file was created');
});

// Работа с папками
fs.access('./recoveryFiles', (error) => {
	// ПРОВЕРЯТЬ СУЩЕСТВОВАНИЕ/ДОСТУП К ФАЙЛАМ ПЕРЕД РАБОТОЙ С НИМИ НЕ РЕКОМЕНДУЕТСЯ!
	if (error) {
		// Нужно производить необходимое действие и обрабатывать ошибку в случае её возникновения
		fs.mkdir('recoveryFiles', (error) => {
			if (error) console.log(error);
			else console.log('Folder was created');
		});
	} else console.log('Folder already exists');
});

await Promise.resolve(console.log('🎉'));
