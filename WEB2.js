const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/calculate-bmi", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    return res.send("<h2>Invalid input</h2><a href='/'>Go back</a>");
  }

  const bmi = weight / (height * height);

  let category = "";
  let className = "";

  if (bmi < 18.5) {
    category = "Underweight";
    className = "underweight";
  } else if (bmi < 24.9) {
    category = "Normal weight";
    className = "normal";
  } else if (bmi < 29.9) {
    category = "Overweight";
    className = "overweight";
  } else {
    category = "Obese";
    className = "obese";
  }

  res.send(`
    <link rel="stylesheet" href="/style.css">
    <div class="container">
      <h1>BMI Result</h1>
      <p class="result ${className}">
        Your BMI is ${bmi.toFixed(2)} (${category})
      </p>
      <a href="/">Calculate again</a>
    </div>
  `);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
