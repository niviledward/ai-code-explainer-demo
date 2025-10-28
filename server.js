// server.js
const express = require("express");
const path = require("path");
const app = express();

// middleware so we can read JSON from POST body
app.use(express.json());

// serve static files (html, css, js)
app.use(express.static(path.join(__dirname, "public")));

// fake AI endpoint
app.post("/api/analyze", (req, res) => {
  const { mode, code, question } = req.body;

  // super simple mock responses
  let explanation = "";
  let improvements = "";
  let quality = "";

  if (mode === "beginner") {
    explanation =
      "This code defines a function and then loops through the list. " +
      "It keeps track of the biggest number it has seen so far.\n\n" +
      "Think of it like: I look at each number and ask 'are you bigger?'";
    improvements =
      "You might want to check what happens if the list is empty, " +
      "so the code doesn't crash.";
    quality =
      "Complexity is O(n), which means it checks each number once. " +
      "That's normal and good for this job.";
  } else if (mode === "pro") {
    explanation =
      "Iterates the list and tracks max. Straightforward single-pass scan.";
    improvements =
      "Use built-in max(nums) for readability. Add guard for empty input.";
    quality =
      "Time: O(n). Space: O(1). Add unit tests for [] and negative-only arrays.";
  } else if (mode === "reviewer") {
    explanation =
      "Function assumes nums has at least one element. No validation.\n" +
      "Also re-scans first element redundantly.";
    improvements =
      "Refactor to:\n" +
      "1) Fail fast on empty input.\n" +
      "2) Use descriptive naming (e.g. currentMax).\n" +
      "3) Separate core logic and validation for testability.";
    quality =
      "Edge cases not handled. Lacks docstring. Consider SRP and input contracts.";
  } else {
    explanation = "Unknown mode.";
    improvements = "";
    quality = "";
  }

  // you can also include their 'question' if you want to show it's read
  res.json({
    mode,
    summary: `Answering in ${mode} mode. You asked: "${question || "Explain the code."}"`,
    sections: {
      explanation,
      improvements,
      quality,
    },
  });
});

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
