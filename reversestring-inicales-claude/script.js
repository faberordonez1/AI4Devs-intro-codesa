// Elementos del DOM
const inputText = document.getElementById("inputText");
const reverseBtn = document.getElementById("reverseBtn");
const copyBtn = document.getElementById("copyBtn");
const result = document.getElementById("result");
const themeToggle = document.getElementById("themeToggle");

// Función para reversar el texto
function reverseString(str) {
  return str.split("").reverse().join("");
}

// Evento para el botón de reverse
reverseBtn.addEventListener("click", () => {
  const text = inputText.value;
  if (text) {
    const reversed = reverseString(text);
    result.textContent = reversed;
    copyBtn.disabled = false;
    copyBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
});

// Evento para copiar al portapapeles
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(result.textContent);

    // Feedback visual temporal
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<span class="text-xl">✅</span> Copiado!';

    setTimeout(() => {
      copyBtn.innerHTML = originalText;
    }, 2000);
  } catch (err) {
    console.error("Error al copiar:", err);
  }
});

// Cambio de tema claro/oscuro
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// Deshabilitar el botón de copiar inicialmente
copyBtn.classList.add("opacity-50", "cursor-not-allowed");
