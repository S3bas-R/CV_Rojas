# 🚀 Editor de CVs _ Rojas

Editor de currículums en tiempo real con **6 plantillas profesionales**, **auto-guardado**, **exportación a PDF** y **diseño moderno**.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 **Tabla de Contenidos**

- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías](#-tecnologías)
- [Plantillas Disponibles](#-plantillas-disponibles)
- [Troubleshooting](#-troubleshooting)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## ✨ **Características**

### 🎨 **6 Plantillas Profesionales**
- **💼 Profesional** - Diseño clásico ATS-friendly de 2 columnas
- **🎨 Moderno** - Sidebar colorido con diseño dinámico
- **✨ Minimalista** - Estilo editorial ultra limpio
- **🚀 Creativo** - Gradientes coloridos y tarjetas glassmorphism
- **💻 Tech** - Tema oscuro estilo terminal para developers
- **👔 Ejecutivo** - Premium corporativo minimalista

### 📝 **Secciones Completas**
- ✅ Información Personal (contacto + redes sociales)
- ✅ Experiencia Laboral (ilimitada, con descripción detallada)
- ✅ Educación (títulos, certificados, cursos)
- ✅ Habilidades Técnicas (con barras de progreso animadas)
- ✅ Proyectos (con tecnologías utilizadas)
- ✅ **Certificaciones** 🏆 (nombre, emisor, credencial)
- ✅ **Voluntariado** 🤝 (organización, rol, descripción)
- ✅ **Premios y Reconocimientos** 🏅 (título, emisor, descripción)
- ✅ Habilidades Blandas (soft skills en tags)
- ✅ Idiomas (con nivel de dominio)
- ✅ Hobbies e Intereses

### 🔥 **Funcionalidades Premium**
- 💾 **Auto-guardado** en localStorage (nunca pierdas tu trabajo)
- 🌐 **Bilingüe** - Editor en ES/EN + CV independiente en ES/EN
- 📸 **Upload de foto** + preview en tiempo real
- 🎨 **Selector de color** con 6 presets + color personalizado
- 📄 **Export a PDF** perfecto (Ctrl/Cmd + P)
- ✨ **Animaciones Framer Motion** fluidas y profesionales
- 📱 **100% Responsive** - Desktop, tablet y móvil
- 🔗 **Redes sociales** completas (LinkedIn, GitHub, Portfolio, Twitter, Instagram)
- 🌈 **Parallax background** elegante y animado
- 🎯 **Diseño Apple-style** - Glassmorphism, blur, sombras sutiles

---

## 🔧 **Requisitos Previos**

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu computadora:

### **1. Node.js (versión 18 o superior)**

Node.js es el entorno de ejecución de JavaScript que necesitamos para ejecutar el proyecto.

**Verificar si lo tienes instalado:**
```bash
node --version
```

Si te muestra algo como `v18.x.x` o `v20.x.x`, ¡perfecto! Si no:

**Descargar e instalar:**
- Windows/Mac: https://nodejs.org/ (descarga la versión LTS)
- Linux (Ubuntu/Debian):
```bash
  sudo apt update
  sudo apt install nodejs npm
```

### **2. npm (viene incluido con Node.js)**

npm es el gestor de paquetes de Node.js. Se instala automáticamente con Node.js.

**Verificar versión:**
```bash
npm --version
```

Debe mostrar versión 9.x.x o superior.

### **3. Git (opcional, pero recomendado)**

Para clonar el repositorio fácilmente.

**Verificar si lo tienes:**
```bash
git --version
```

**Instalar Git:**
- Windows: https://git-scm.com/download/win
- Mac: `brew install git` (necesitas Homebrew)
- Linux: `sudo apt install git`

### **4. Editor de Código (recomendado)**

- **Visual Studio Code**: https://code.visualstudio.com/
- Extensiones recomendadas:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

---

## 📥 **Instalación**

Sigue estos pasos **exactamente** en el orden indicado:

### **Paso 1: Clonar o Descargar el Proyecto**

**Opción A - Con Git (recomendado):**
```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/cv-editor-sebas.git

# Entra a la carpeta del proyecto
cd cv-editor-sebas
```

**Opción B - Sin Git:**
1. Descarga el proyecto como ZIP
2. Descomprime el archivo
3. Abre la terminal/PowerShell en esa carpeta

### **Paso 2: Instalar Dependencias**

Este paso puede tardar 2-5 minutos dependiendo de tu conexión a internet.
```bash
# Instala todas las dependencias del proyecto
npm install
```

**⚠️ IMPORTANTE:** Si ya instalaste antes y tuviste problemas, **PRIMERO limpia todo**:

**En Windows (PowerShell):**
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

**En Mac/Linux (Terminal):**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Paso 3: Instalar Tailwind CSS v3**
```bash
# Instala Tailwind CSS v3 (versión estable)
npm install -D tailwindcss@3 postcss autoprefixer
```

**❗ NOTA CRÍTICA:** Usa **SOLO Tailwind v3** (no v4). La versión 4 tiene problemas de compatibilidad.

### **Paso 4: Instalar Dependencias de Animación**
```bash
# Instala Framer Motion (animaciones) y Lucide React (iconos)
npm install framer-motion lucide-react
```

---

## ⚙️ **Configuración**

Verifica que estos archivos existan y tengan el contenido correcto:

### **1. `tailwind.config.js`** (raíz del proyecto)
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**¿Qué hace este archivo?**
- Le dice a Tailwind CSS dónde buscar las clases CSS en tu proyecto
- Configura temas personalizados (colores, fuentes, etc.)
- Carga plugins adicionales de Tailwind

### **2. `postcss.config.js`** (raíz del proyecto)
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**¿Qué hace este archivo?**
- Procesa el CSS de Tailwind
- Añade prefijos de navegador automáticamente para compatibilidad

### **3. `src/index.css`** (SOLO debe contener esto)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**¿Qué hace este archivo?**
- Importa todos los estilos base de Tailwind
- Importa componentes pre-construidos
- Importa utilidades (clases como `p-4`, `bg-blue-500`, etc.)

**⚠️ IMPORTANTE:** NO agregues nada más en este archivo. Si hay más código, bórralo.

### **4. `src/main.jsx`** (debe importar el CSS)
```jsx
import './index.css'  // ← ESTA LÍNEA ES CRÍTICA
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**¿Qué hace este archivo?**
- Punto de entrada principal de la aplicación
- Importa los estilos de Tailwind (línea 1)
- Renderiza la aplicación en el DOM

### **5. `vite.config.js`** (opcional, pero recomendado)

Si Tailwind no carga, crea este archivo en la raíz:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
})
```

**¿Qué hace este archivo?**
- Configura Vite (el bundler ultra-rápido que usa el proyecto)
- Conecta React con Vite
- Especifica la ruta de PostCSS

---

## 🚀 **Uso**

### **Iniciar el Servidor de Desarrollo**
```bash
npm run dev
```

**¿Qué hace este comando?**
- Inicia el servidor de desarrollo en `http://localhost:5173`
- Habilita Hot Module Replacement (cambios en vivo sin recargar)
- Compila y sirve la aplicación

**Salida esperada:**
```
  VITE v5.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Abre tu navegador en `http://localhost:5173`

### **Comandos Disponibles**
```bash
# Desarrollo - Inicia servidor local con hot reload
npm run dev

# Build - Genera versión optimizada para producción
npm run build

# Preview - Previsualiza la versión de producción
npm run preview

# Lint - Revisa errores de código
npm run lint
```

---

## 📂 **Estructura del Proyecto**
```
cv-editor-sebas/
├── public/                  # Archivos públicos estáticos
│   └── vite.svg            # Favicon por defecto
├── src/                     # Código fuente principal
│   ├── App.jsx             # Componente principal (TODO EL EDITOR)
│   ├── index.css           # Estilos de Tailwind (solo 3 líneas)
│   └── main.jsx            # Punto de entrada React
├── .gitignore              # Archivos ignorados por Git
├── index.html              # HTML base
├── package.json            # Dependencias del proyecto
├── package-lock.json       # Lockfile de dependencias (auto-generado)
├── postcss.config.js       # Configuración PostCSS
├── tailwind.config.js      # Configuración Tailwind CSS
├── vite.config.js          # Configuración Vite (opcional)
└── README.md               # Este archivo
```

### **Archivos Clave Explicados**

#### **`src/App.jsx`** (El corazón del proyecto)
- **Líneas 1-100**: Traducciones ES/EN
- **Líneas 101-200**: Estado inicial con tu información
- **Líneas 201-400**: Componente principal del editor
- **Líneas 401-600**: Tab "Personal" con formularios
- **Líneas 601-800**: Tabs "Experiencia", "Educación", "Skills"
- **Líneas 801-1000**: Tab "Proyectos" y "Extras" (certificaciones, voluntariado, premios)
- **Líneas 1001-1200**: Tab "Diseño" con selector de plantillas, colores, foto
- **Líneas 1201-1500**: Plantilla "Profesional" (2 columnas clásica)
- **Líneas 1501-1700**: Plantilla "Moderna" (sidebar colorido)
- **Líneas 1701-1900**: Plantilla "Minimalista" (editorial limpio)
- **Líneas 1901-2100**: Plantilla "Creativa" (colorida con glassmorphism)
- **Líneas 2101-2300**: Plantilla "Tech" (tema oscuro terminal)
- **Líneas 2301-2500**: Plantilla "Ejecutiva" (premium corporativo)

#### **`package.json`** (Dependencias del proyecto)
```json
{
  "dependencies": {
    "react": "^18.3.1",              // Librería React
    "react-dom": "^18.3.1",          // React para el DOM
    "framer-motion": "^11.x.x",      // Animaciones fluidas
    "lucide-react": "^0.x.x"         // Iconos modernos
  },
  "devDependencies": {
    "vite": "^5.x.x",                // Bundler ultra-rápido
    "tailwindcss": "^3.4.x",         // Framework CSS utility-first
    "postcss": "^8.x.x",             // Procesador CSS
    "autoprefixer": "^10.x.x",       // Prefijos CSS automáticos
    "@vitejs/plugin-react": "^4.x.x" // Plugin React para Vite
  }
}
```

---

## 🛠️ **Tecnologías**

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.3+ | Librería UI para construir interfaces |
| **Vite** | 5.x | Build tool ultra-rápido con HMR |
| **Tailwind CSS** | 3.4+ | Framework CSS utility-first |
| **Framer Motion** | 11.x | Librería de animaciones fluidas |
| **Lucide React** | 0.x | Pack de iconos SVG modernos |
| **PostCSS** | 8.x | Procesador de CSS |
| **Autoprefixer** | 10.x | Añade prefijos CSS para navegadores |

### **¿Por qué estas tecnologías?**

- **React**: Componentes reutilizables, estado reactivo, ecosistema enorme
- **Vite**: 10-100x más rápido que Webpack, HMR instantáneo
- **Tailwind CSS**: Desarrollo rápido, sin CSS custom, diseño consistente
- **Framer Motion**: Animaciones declarativas con React, API simple
- **Lucide React**: Iconos consistentes, ligeros, optimizados para React

---

## 🎨 **Plantillas Disponibles**

### **1. 💼 Profesional** (Recomendada para ATS)
- **Estilo**: Clásico de 2 columnas
- **Diseño**: Sidebar gris + contenido blanco
- **Ideal para**: Aplicaciones corporativas, ATS-friendly
- **Características**: Timeline con círculos, secciones organizadas

### **2. 🎨 Moderno**
- **Estilo**: Sidebar colorido con fondo gradiente
- **Diseño**: 2 columnas (35% sidebar / 65% contenido)
- **Ideal para**: Profesionales creativos, diseñadores
- **Características**: Cards con glassmorphism, hover effects

### **3. ✨ Minimalista**
- **Estilo**: Ultra limpio, editorial
- **Diseño**: Centrado, mucho espacio en blanco
- **Ideal para**: Ejecutivos, consultores, académicos
- **Características**: Tipografía ligera, bordes sutiles

### **4. 🚀 Creativo**
- **Estilo**: Colorido con gradientes vibrantes
- **Diseño**: Header destacado + grid de cards
- **Ideal para**: Artistas, diseñadores, marketers
- **Características**: Foto con rotación, fondos gradiente

### **5. 💻 Tech**
- **Estilo**: Tema oscuro tipo terminal
- **Diseño**: Fondo negro + sintaxis de código
- **Ideal para**: Developers, ingenieros, IT
- **Características**: Sintaxis `$ cat`, `ls -la`, bordes cian

### **6. 👔 Ejecutivo**
- **Estilo**: Premium corporativo minimalista
- **Diseño**: Barra superior + layout horizontal
- **Ideal para**: CEOs, gerentes, directores
- **Características**: Tipografía con tracking, ultra limpio

---

## 🎯 **Funcionalidades Principales**

### **Auto-guardado**
```javascript
// El CV se guarda automáticamente en localStorage cada vez que editas
useEffect(() => {
  localStorage.setItem('cv-data-ultimate', JSON.stringify(data));
}, [data]);
```

**Beneficios:**
- Nunca pierdes tu trabajo
- No necesitas servidor
- Funciona offline
- Restaura automáticamente al recargar

### **Exportar a PDF**
```javascript
// Usa la función de impresión del navegador
const exportPDF = () => window.print();
```

**Cómo usar:**
1. Click en "Exportar a PDF" o presiona `Ctrl+P` (Windows) / `Cmd+P` (Mac)
2. Selecciona "Guardar como PDF"
3. Ajusta márgenes a "Ninguno"
4. Click en "Guardar"

**Formato:** A4 perfecto (210mm × 297mm)

### **Cambio de Idioma**
- **Editor**: Selector arriba a la derecha (🇪🇸 ES / 🇬🇧 EN)
- **CV**: Independiente, en pestaña "Diseño"

### **Selector de Plantillas**
1. Ve a la pestaña "Diseño"
2. Click en la plantilla que quieras
3. El preview cambia instantáneamente

### **Upload de Foto**
1. Pestaña "Diseño" → "Subir Foto"
2. Click en el botón "Subir Foto"
3. Selecciona imagen (JPG, PNG, WebP)
4. Preview en tiempo real

**O usa URL:**
- Pega el link de la imagen en el campo "URL imagen"

---

## 🐛 **Troubleshooting**

### **Problema 1: Los estilos no se aplican (todo se ve sin formato)**

**Síntomas:**
- El editor funciona pero sin colores ni diseño
- Se ve solo texto plano

**Solución:**

**Paso 1:** Verifica `src/index.css`
```css
/* Debe tener SOLO estas 3 líneas */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Paso 2:** Reinstala Tailwind v3
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm install -D tailwindcss@3 postcss autoprefixer

# Mac/Linux
rm -rf node_modules package-lock.json
npm install
npm install -D tailwindcss@3 postcss autoprefixer
```

**Paso 3:** Reinicia el servidor
```bash
# Detén con Ctrl+C
npm run dev
```

---

### **Problema 2: Error "Cannot find module 'framer-motion'"**

**Solución:**
```bash
npm install framer-motion lucide-react
```

---

### **Problema 3: Error de PostCSS o Tailwind**

**Error:**
```
[postcss] It looks like you're trying to use `tailwindcss` directly...
```

**Solución:**

**Opción A (Recomendada):** Usa Tailwind v3
```bash
npm uninstall tailwindcss @tailwindcss/postcss
npm install -D tailwindcss@3 postcss autoprefixer
```

**Opción B:** Actualiza PostCSS config
```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // ← Cambia esto
    autoprefixer: {},
  },
}
```

---

### **Problema 4: Puerto 5173 ya en uso**

**Solución:**

**Opción A:** Mata el proceso existente
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

**Opción B:** Usa otro puerto
```bash
npm run dev -- --port 3000
```

---

### **Problema 5: Página en blanco después de `npm run build`**

**Solución:**

Edita `vite.config.js`:
```js
export default defineConfig({
  base: './',  // ← Añade esta línea
  plugins: [react()],
})
```

Luego:
```bash
npm run build
```

---

## 📦 **Build para Producción**

### **Generar Build Optimizado**
```bash
npm run build
```

**¿Qué hace este comando?**
- Minifica JavaScript y CSS
- Optimiza imágenes
- Tree-shaking (elimina código no usado)
- Genera carpeta `dist/` lista para deployment

**Salida:**
```
dist/
├── assets/
│   ├── index-[hash].js   # JavaScript minificado
│   └── index-[hash].css  # CSS minificado
└── index.html            # HTML optimizado
```

### **Previsualizar Build**
```bash
npm run preview
```

Abre `http://localhost:4173` para ver la versión de producción.

### **Deployment**

**Vercel (Recomendado):**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm run build
# Arrastra carpeta dist/ a netlify.com/drop
```

**GitHub Pages:**
```bash
npm run build
# Sube carpeta dist/ a rama gh-pages
```

---

## 📝 **Notas Adicionales**

### **Limitaciones Conocidas**

1. **localStorage**: Máximo ~5MB de datos
   - Suficiente para 100+ CVs completos
   - Los datos se borran si limpias caché del navegador

2. **Export PDF**: Usa impresión del navegador
   - Algunos navegadores pueden tener pequeñas diferencias
   - Chrome/Edge dan los mejores resultados

3. **Fotos**: No se suben a servidor
   - Se guardan como base64 en localStorage
   - Usar imágenes < 500KB para mejor rendimiento

### **Próximas Features (Roadmap)**

- [ ] Sistema de templates guardados
- [ ] Compartir CV con link único
- [ ] Export a Word (.docx)
- [ ] Más plantillas (Académico, Freelancer)
- [ ] Referencias laborales
- [ ] Publicaciones y conferencias
- [ ] Drag & drop para reordenar secciones
- [ ] Preview responsive en el editor
- [ ] Modo oscuro en el editor
- [ ] Sync en la nube (Firebase/Supabase)

---

## 📄 **Licencia**

MIT License - Puedes usar este proyecto libremente para proyectos personales y comerciales.
```
Copyright (c) 2025 [Tu Nombre]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 **Créditos**

Desarrollado con ❤️ por **Sebastián Rojas**

**Tecnologías utilizadas:**
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

**Inspirado en:**
- Apple Design System
- rxresu.me
- resume.io
- Canva Resume Builder

---

## 📞 **Soporte**

¿Necesitas ayuda? 

- 📧 Email: sebas.educa00@gmail.com
---
**Hecho con 💙 en Ecuador 🇪🇨**

**Última actualización:** Noviembre 2025
