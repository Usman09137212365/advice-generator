const API_URL = "https://api.adviceslip.com/advice";

const adviceIdEl = document.getElementById("advice-id");
const adviceTextEl = document.getElementById("advice-text");
const button = document.getElementById("generate-btn");

function setLoading() {
  button.disabled = true;
  adviceTextEl.classList.remove("is-error");
  adviceTextEl.textContent = "Loading advice...";
}

function renderAdvice(slip) {
  adviceIdEl.textContent = slip.id;
  adviceTextEl.textContent = `\u201C${slip.advice}\u201D`;
}

function renderError() {
  adviceIdEl.textContent = "--";
  adviceTextEl.classList.add("is-error");
  adviceTextEl.textContent = "Couldn't fetch advice. Check your connection and try again.";
}

async function getAdvice() {
  setLoading();
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { slip } = await res.json();
    renderAdvice(slip);
  } catch (err) {
    console.error(err);
    renderError();
  } finally {
    button.disabled = false;
  }
}

button.addEventListener("click", getAdvice);
getAdvice();