const { log } = require("console");
const fs = require("fs");

let data = "";
try {
	data = fs.readFileSync("./input.txt", "utf-8");
} catch (err) {
	console.log(err);
	process.exit(1);
}

function calculateCharacterScore(char) {
	const charAscii = char.charCodeAt(0);

	if (charAscii > 90) {
		return charAscii - 96;
	} else if (charAscii >= 65) {
		return charAscii - 64 + 26;
	}
}

const array = data.split("\n");
let score = 0;

for (let i = 0; i < array.length; i++) {
	const str = array[i];
	const compartmentLength = str.length / 2;
	const firstCompartment = str.substring(0, compartmentLength);
	const secondCompartment = str.substring(compartmentLength);

	for (let j = 0; j < secondCompartment.length; j++) {
		if (firstCompartment.indexOf(secondCompartment[j]) !== -1) {
			score += calculateCharacterScore(secondCompartment[j]);

			break;
		}
	}
}

console.log("First star:", score);

function removeCharacter(str, position) {
	let newString =
		str.substring(0, position - 1) + str.substring(position, str.length);
	return newString;
}

const n = 3;
for (let i = 0; i < array.length; i += n) {
	// const arr = [];
	// for(let j=0; j<n; j++) arr.push(array[j]);

	const map = {};
	let firstStr = array[i];
	// for (let j = 0; j < array[i].length; j++) {
	// 	if (map[firstStr[j]]) {
	// 		map[firstStr[j]]++;
	// 	} else {
	// 		map[firstStr[j]] = 1;
	// 	}
	// }

	for (let j = i + 1; j < i + n; j++) {
		for (let char of array[j]) {
			if (firstStr.indexOf(char) !== -1) {
				const indexes = [];
				for (let index = 0; index < firstStr.length; index++) {
					if (firstStr[index] === char) {
						indexes.push(index);
					}
				}

				for (let index in indexes) {
					firstStr = removeCharacter(firstStr, index);
				}
			}
		}
	}
	console.log(firstStr);
}

// ASCII
// 97 a -> 122 z
// 65 A -> 90 Z
