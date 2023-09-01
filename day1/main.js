const https = require("node:https");

const options = {
  hostname: "adventofcode.com",
  method: "GET",
  path: "/2022/day/1/input",
  headers: {
    Cookie: "SESSION_COOKIE", // replace with your session cookie for fetching data
  },
};

https
  .get(options, (response) => {
    let caloriesData = "";

    response.on("data", (chunk) => {
      caloriesData += chunk;
    });

    response.on("end", () => {
      let maxCalories = 0;
      let newLineCounter = 0;
      let currentNumber = "";
      let currentSum = 0;

      let s1 = 0,
        s2 = 0,
        s3 = 0;

      for (let i = 0; i < caloriesData.length; i++) {
        if (caloriesData[i] !== "\n") {
          currentNumber += caloriesData[i];
          newLineCounter = 0;
        } else {
          newLineCounter++;
          currentSum += Number(currentNumber);
          currentNumber = "";
        }
        if (newLineCounter == 2) {
          newLineCounter = 0;

          maxCalories = maxCalories > currentSum ? maxCalories : currentSum;

          if (currentSum > s1) {
            s3 = s2;
            s2 = s1;
            s1 = currentSum;
          } else if (currentSum > s2) {
            s3 = s2;
            s2 = currentSum;
          } else if (currentSum > s3) {
            s3 = currentSum;
          }

          currentSum = 0;
        }
      }
      console.log(maxCalories); // first star
      console.log(s1 + s2 + s3); // second star
    });
  })
  .on("error", (e) => {
    console.error(e);
  });
