const fs = require("fs");
let data = "";
try {
	data = fs.readFileSync("./input.txt", "utf8");
} catch (error) {
	console.log(error);
}

// shape scores => rock = 1; paper = 2; scissors = 3;
// score = myChoice + outcome

function myChoiceScore(myChoice) {
	switch (myChoice) {
		case "X":
			return 1;
		case "Y":
			return 2;
		case "Z":
			return 3;
	}
}

function outCome(opponentChoice, myChoice) {
	switch (opponentChoice) {
		case "A": // opponent is rock
			if (myChoice === "X") return 3;
			if (myChoice === "Y") return 6;
			if (myChoice === "Z") return 0;
		case "B": // opponent is paper
			if (myChoice === "X") return 0;
			if (myChoice === "Y") return 3;
			if (myChoice === "Z") return 6;
		case "C": // opponent is scissors
			if (myChoice === "X") return 6;
			if (myChoice === "Y") return 0;
			if (myChoice === "Z") return 3;
	}
}


function roundScore(opponentChoice, myChoice) {
	const score = outCome(opponentChoice, myChoice) + myChoiceScore(myChoice);

	// console.log(`The score of ${opponentChoice} and ${myChoice} is ${score}`)

	return score;
}

function myChoiceDecider(opponentChoice, outcome){
	switch(outcome){
	case "X": // lose
		if(opponentChoice === "A") return "Z";
		if(opponentChoice === "B") return "X";
		if(opponentChoice === "C") return "Y";
	case "Y": // draw
		if(opponentChoice === "A") return "X";
		if(opponentChoice === "B") return "Y";
		if(opponentChoice === "C") return "Z";
	case "Z": // win
		if(opponentChoice === "A") return "Y";
		if(opponentChoice === "B") return "Z";
		if(opponentChoice === "C") return "X";
	
	}
}

// for 2 stars
function roundScore2(opponentChoice, outcome){
	const roundChoice = myChoiceDecider(opponentChoice, outcome);
	switch(outcome){
	case "X": // need to lose
		return 0 + myChoiceScore(roundChoice); // this is the outCome function used in first star.
	case "Y": // need to draw
		return 3 + myChoiceScore(roundChoice); 
	case "Z": // need to win
		return 6 + myChoiceScore(roundChoice); 
	
	}
}



let totalScore = 0;
for (let i = 0; i < data.length; i += 5) {
	const score = roundScore2(data[i], data[i + 2])
	totalScore += score;
}

console.log(totalScore);
