# Reverse String App - Documentación de Desarrollo

Este documento registra el proceso de desarrollo y los prompts utilizados para crear la aplicación Reverse String.

## Prompt 1: Solicitud Inicial

**Usuario solicitó:**
```
Hola .!

Hoy seras mi asistente para crear una pagina web sencilla con html,js y tailwind para los estilos, 
adicionalmente generaras un archivo prompt.md donde vas a ir guardando todos los prompt que te envio en este chat, te lo solicitare al final de la conversación cuando la web este lista
```

**Respuesta:**
Se creó una estructura inicial HTML con:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Página Web</title>
    <!-- Incluimos Tailwind desde CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow-md">
        <nav class="container mx-auto px-6 py-4">
            <h1 class="text-2xl font-bold text-gray-800">Mi Sitio Web</h1>
        </nav>
    </header>

    <main class="container mx-auto px-6 py-8">
        <section class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Bienvenido</h2>
            <p class="text-gray-600">Esta es una página web sencilla creada con HTML, JavaScript y Tailwind CSS.</p>
        </section>
    </main>

    <script>
        // Aquí irá el código JavaScript que necesitemos
        console.log('¡La página está funcionando!');
    </script>
</body>
</html>
```

## Prompt 2: Especificaciones Detalladas

**Usuario solicitó:**
```
Titulo: Reverse String
Campos formulario:
- Input tipo texto donde se ingresara el texto a reversar
- Boton Reverse que permite ejecutar el metodo js que reversa el texto escrito en el input text
- Label que muestra el texto reversado despues de presionar el boton reverse
- Boton Adicional para copiar el texto reversado al portapapeles
- Boton al lado derecho que permita cambiar entre modo claro y oscuro, por defecto debe cargar en modo oscuro

Estilos
 - Cada boton debe estar acompañado de icono alusivo a la accion a realizar

Nombre de Archivos
 - index.html y script.js
```

**Respuesta:**
Se desarrollaron dos archivos:

**index.html:**
```html
<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reverse String</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lucide/0.263.1/umd/lucide.min.js"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {}
            }
        }
    </script>
</head>
<body class="min-h-screen transition-colors duration-200 dark:bg-gray-900 bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <header class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold dark:text-white text-gray-800">Reverse String</h1>
            <button id="themeToggle" class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <i data-lucide="sun" class="hidden dark:block dark:text-white"></i>
                <i data-lucide="moon" class="block dark:hidden text-gray-800"></i>
            </button>
        </header>

        <main class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
            <div class="space-y-4">
                <div class="relative">
                    <input 
                        type="text" 
                        id="inputText" 
                        class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingresa el texto a reversar"
                    >
                </div>

                <div class="flex gap-2">
                    <button 
                        id="reverseBtn"
                        class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <i data-lucide="refresh-cw"></i>
                        Reverse
                    </button>
                    
                    <button 
                        id="copyBtn"
                        class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        disabled
                    >
                        <i data-lucide="clipboard-copy"></i>
                        Copiar
                    </button>
                </div>

                <div class="mt-4">
                    <label class="block text-sm font-medium mb-2 dark:text-gray-200">Resultado:</label>
                    <p id="result" class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[40px] dark:text-white"></p>
                </div>
            </div>
        </main>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

**script.js:**
```javascript
// Inicializar los íconos de Lucide
lucide.createIcons();

// Elementos del DOM
const inputText = document.getElementById('inputText');
const reverseBtn = document.getElementById('reverseBtn');
const copyBtn = document.getElementById('copyBtn');
const result = document.getElementById('result');
const themeToggle = document.getElementById('themeToggle');

// Función para reversar el texto
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Evento para el botón de reverse
reverseBtn.addEventListener('click', () => {
    const text = inputText.value;
    if (text) {
        const reversed = reverseString(text);
        result.textContent = reversed;
        copyBtn.disabled = false;
        copyBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
});

// Evento para copiar al portapapeles
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(result.textContent);
        
        // Feedback visual temporal
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i data-lucide="check"></i>Copiado!';
        lucide.createIcons(); // Recrear el ícono
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            lucide.createIcons(); // Recrear el ícono
        }, 2000);
    } catch (err) {
        console.error('Error al copiar:', err);
    }
});

// Cambio de tema claro/oscuro
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
});

// Deshabilitar el botón de copiar inicialmente
copyBtn.classList.add('opacity-50', 'cursor-not-allowed');
```

## Prompt 3: Cambio de Iconos

**Usuario solicitó:**
```
En lugar de usar iconos prefiero que uses emojis, para evitar el uso de Lucide
```

**Respuesta:**
Se actualizaron los archivos:

**index.html:**
```html
<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reverse String</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {}
            }
        }
    </script>
</head>
<body class="min-h-screen transition-colors duration-200 dark:bg-gray-900 bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <header class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold dark:text-white text-gray-800">Reverse String</h1>
            <button id="themeToggle" class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-2xl">
                <span class="hidden dark:block">☀️</span>
                <span class="block dark:hidden">🌙</span>
            </button>
        </header>

        <main class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
            <div class="space-y-4">
                <div class="relative">
                    <input 
                        type="text" 
                        id="inputText" 
                        class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingresa el texto a reversar"
                    >
                </div>

                <div class="flex gap-2">
                    <button 
                        id="reverseBtn"
                        class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <span class="text-xl">🔄</span>
                        Reverse
                    </button>
                    
                    <button 
                        id="copyBtn"
                        class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        disabled
                    >
                        <span class="text-xl">📋</span>
                        Copiar
                    </button>
                </div>

                <div class="mt-4">
                    <label class="block text-sm font-medium mb-2 dark:text-gray-200">Resultado:</label>
                    <p id="result" class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[40px] dark:text-white"></p>
                </div>
            </div>
        </main>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

**script.js:**
```javascript
// Elementos del DOM
const inputText = document.getElementById('inputText');
const reverseBtn = document.getElementById('reverseBtn');
const copyBtn = document.getElementById('copyBtn');
const result = document.getElementById('result');
const themeToggle = document.getElementById('themeToggle');

// Función para reversar el texto
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Evento para el botón de reverse
reverseBtn.addEventListener('click', () => {
    const text = inputText.value;
    if (text) {
        const reversed = reverseString(text);
        result.textContent = reversed;
        copyBtn.disabled = false;
        copyBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
});

// Evento para copiar al portapapeles
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(result.textContent);
        
        // Feedback visual temporal
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="text-xl">✅</span> Copiado!';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    } catch (err) {
        console.error('Error al copiar:', err);
    }
});

// Cambio de tema claro/oscuro
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
});

// Deshabilitar el botón de copiar inicialmente
copyBtn.classList.add('opacity-50', 'cursor-not-allowed');
```

## Prompt 4: Ajustes Finales de UI

**Usuario solicitó:**
```
Tengo ajsute adicionales para el boton de cambio de Dark mode a ligth mode y para el orden de los botones del formulario

1: Quiero que acompañes el icono por las palabras Dark Mode o Ligth Mode segun corresponda y estas deben estar en mayuscula

2: El boton debe tener un con fondo opuesto al tema que esta seleccionado para que sea visible en la pantalla

3: Para el formulario el boton reverse debe posicionarse a la derecha del input text y boton copiar a la derecha del label del texto reversado
```

**Respuesta:**
Versión final de los archivos:

**index.html:**
```html
<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reverse String</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {}
            }
        }
    </script>
</head>
<body class="min-h-screen transition-colors duration-200 dark:bg-gray-900 bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <header class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold dark:text-white text-gray-800">Reverse String</h1>
            <button id="themeToggle" class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors dark:bg-white bg-gray-900">
                <span class="text-xl hidden dark:block">☀️</span>
                <span class="text-xl block dark:hidden">🌙</span>
                <span class="hidden dark:block dark:text-gray-900 font-medium">LIGHT MODE</span>
                <span class="block dark:hidden text-white font-medium">DARK MODE</span>
            </button>
        </header>

        <main class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
            <div class="space-y-4">
                <div class="flex gap-2">
                    <input 
                        type="text" 
                        id="inputText" 
                        class="flex-grow px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingresa el texto a reversar"
                    >
                    <button 
                        id="reverseBtn"
                        class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
                    >
                        <span class="text-xl">🔄</span>
                        Reverse
                    </button>
                </div>

                <div class="mt-4">
                    <div class="flex items-center gap-2">
                        <div class="flex-grow">
                            <label class="block text-sm font-medium mb-2 dark:text-gray-200">Resultado:</label>
                            <p id="result" class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[40px] dark:text-white"></p>
                        </div>
                        <button 
                            id="copyBtn"
                            class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors h-fit mt-8"
                            disabled
                        >
                            <span class="text-xl">📋</span>
                            Copiar
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

**script.js:**
```javascript
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


```