document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");
  const reverseBtn = document.getElementById("reverseBtn");
  const copyBtn = document.getElementById("copyBtn");
  const result = document.getElementById("result");
  const themeToggle = document.getElementById("themeToggle");
  const toggleCircle = document.getElementById("toggleCircle");
  const toggleText = document.getElementById("toggleText");
  const container = document.querySelector(".w-full.max-w-md");

  reverseBtn.addEventListener("click", () => {
    result.textContent = textInput.value.split("").reverse().join("");
  });

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(result.textContent).then(() => {
      alert("Copied to clipboard!");
    });
  });

  themeToggle.addEventListener("change", () => {
    const html = document.documentElement;
    if (themeToggle.checked) {
      html.dataset.theme = "light";
      document.body.classList.replace("bg-gray-900", "bg-white");
      document.body.classList.replace("text-white", "text-gray-900");
      container.classList.replace("bg-gray-800", "bg-gray-200");
      textInput.classList.replace("bg-gray-700", "bg-white");
      textInput.classList.replace("text-white", "text-gray-900");
      result.classList.replace("text-white", "text-gray-900");
      toggleCircle.textContent = "☀️";
      toggleCircle.classList.replace("translate-x-0", "translate-x-8");
      toggleText.textContent = "LIGHT MODE";
      toggleText.classList.replace("text-white", "text-gray-900");
    } else {
      html.dataset.theme = "dark";
      document.body.classList.replace("bg-white", "bg-gray-900");
      document.body.classList.replace("text-gray-900", "text-white");
      container.classList.replace("bg-gray-200", "bg-gray-800");
      textInput.classList.replace("bg-white", "bg-gray-700");
      textInput.classList.replace("text-gray-900", "text-white");
      result.classList.replace("text-gray-900", "text-white");
      toggleCircle.textContent = "🌙";
      toggleCircle.classList.replace("translate-x-8", "translate-x-0");
      toggleText.textContent = "DARK MODE";
      toggleText.classList.replace("text-gray-900", "text-white");
    }
  });

  // Initialize theme
  toggleCircle.textContent = "🌙";
  toggleText.textContent = "DARK MODE";
  themeToggle.checked = false;
});
