const fs = require("fs");

let data = "";
try {
	data = fs.readFileSync("./input.txt", "utf-8");
} catch (err) {
	console.log(err);
	process.exit(1);
}

data = data.split('\r\n');

for (let i = 0; i < data.length; i++) {
  data[i] = data[i].split(',');
  data[i][0] = data[i][0].split('-').map(Number); // Convert to numbers
  data[i][1] = data[i][1].split('-').map(Number); // Convert to numbers
}

let count = 0;
for (let i = 0; i < data.length; i++) {
  const [firstStart, firstEnd] = data[i][0];
  const [secondStart, secondEnd] = data[i][1];

  if ((firstStart <= secondStart && firstEnd >= secondEnd) ||
      (secondStart <= firstStart && secondEnd >= firstEnd)) {
    count++;
  }
}

console.log(count);
