const modeSelect = document.getElementById("modeSelect");
const codeInput = document.getElementById("codeInput");
const questionInput = document.getElementById("questionInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");

const loadingEl = document.getElementById("loading");
const responseArea = document.getElementById("responseArea");

const respSummary = document.getElementById("respSummary");
const respExplanation = document.getElementById("respExplanation");
const respImprovements = document.getElementById("respImprovements");
const respQuality = document.getElementById("respQuality");

const currentModeText = document.getElementById("currentModeText");

// update the little "Mode: Beginner 👶" text when dropdown changes
modeSelect.addEventListener("change", () => {
  const labelMap = {
    beginner: "Beginner 👶",
    pro: "Pro 🚀",
    reviewer: "Reviewer 🧠",
  };
  currentModeText.textContent = labelMap[modeSelect.value] || modeSelect.value;
});

analyzeBtn.addEventListener("click", async () => {
  // show loading
  loadingEl.classList.remove("hidden");
  responseArea.classList.add("hidden");

  const payload = {
    mode: modeSelect.value,
    code: codeInput.value,
    question: questionInput.value,
  };

  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    // fill UI with mock "AI" response
    respSummary.textContent = data.summary;
    respExplanation.textContent = data.sections.explanation;
    respImprovements.textContent = data.sections.improvements;
    respQuality.textContent = data.sections.quality;

    // hide loading, show response
    loadingEl.classList.add("hidden");
    responseArea.classList.remove("hidden");
  } catch (err) {
    loadingEl.classList.add("hidden");
    responseArea.classList.remove("hidden");
    respSummary.textContent = "Error getting response.";
    respExplanation.textContent = "";
    respImprovements.textContent = "";
    respQuality.textContent = "";
  }
});

clearBtn.addEventListener("click", () => {
  codeInput.value = "";
  questionInput.value = "";
  responseArea.classList.add("hidden");
});
