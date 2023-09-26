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

const n = 3;
let secondStarScore = 0;
for (let i = 0; i < array.length; i += n) {
	let first = array[i];

	for (let j = i + 1; j < i + n; j++) {
		for (const c of first) {
			const idx = array[j].indexOf(c);
			if (idx === -1) {
				const idxToRemove = first.indexOf(c);
				first =
					first.slice(0, idxToRemove) + first.slice(idxToRemove + 1); // removing the character which is not common
			}
		}
	}

	secondStarScore += calculateCharacterScore(first[0]);
}

console.log("Second Star:", secondStarScore);

// ASCII
// 97 a -> 122 z
// 65 A -> 90 Z
