# 🚀 Guía Maestra de Despliegue en Vercel

Esta guía te llevará paso a paso para publicar tu aplicación **CV Creator** en internet usando **Vercel** y **Supabase**.

---

## 📋 Prerrequisitos

Antes de empezar, asegúrate de tener:
1.  **Cuenta en GitHub:** [github.com](https://github.com)
2.  **Cuenta en Vercel:** [vercel.com](https://vercel.com) (puedes entrar con tu cuenta de GitHub).
3.  **Proyecto en Supabase:** Ya configurado (ver `README_SUPABASE.md`).
4.  **Tu código listo:** Asegúrate de que tu proyecto compila localmente (`npm run build`).

---

## 👣 Paso 1: Subir tu código a GitHub

Vercel necesita que tu código esté en un repositorio para poder construirlo.

1.  Ve a [GitHub](https://github.com/new) y crea un **Nuevo Repositorio**.
    *   Nombre: `cv-creator` (o el que gustes).
    *   Público o Privado (ambos funcionan).
2.  Sube tu código local a este repositorio:
    *   Si usas VS Code, ve a la pestaña de "Source Control" (el icono de rama), haz commit de tus cambios y dale a "Publish Branch".
    *   O por terminal:
        ```bash
        git init
        git add .
        git commit -m "Initial deploy"
        git branch -M main
        git remote add origin https://github.com/S3bas-R/CV_Rojas.git
        git push -u origin main
        ```

---

## ☁️ Paso 2: Importar Proyecto en Vercel

1.  Ve a tu **Dashboard de Vercel** ([vercel.com/dashboard](https://vercel.com/dashboard)).
2.  Haz clic en el botón blanco **"Add New..."** y selecciona **"Project"**.
3.  En la lista de "Import Git Repository", busca tu repo `cv-creator` y haz clic en **"Import"**.

---

## ⚙️ Paso 3: Configuración del Proyecto (¡CRUCIAL!)

En la pantalla de configuración ("Configure Project"):

1.  **Project Name:** Déjalo como está o cámbialo si quieres.
2.  **Framework Preset:** Vercel debería detectar **Vite** automáticamente. Si no, selecciónalo.
3.  **Root Directory:** Déjalo en `./`.
4.  **Build and Output Settings:** Déjalo por defecto (Build: `vite build`, Output: `dist`).

### 🔐 Variables de Entorno (Environment Variables)

Este es el paso más importante. Despliega la sección **"Environment Variables"** y agrega las siguientes:

| Nombre (Key) | Valor (Value) | Descripción |
| :--- | :--- | :--- |
| `POSTGRES_URL` | `postgresql://postgres...` | **Tu conexión de Supabase.** (Ver abajo*) |
| `JWT_SECRET` | `tu_secreto_seguro` | Inventa una frase larga y segura. |
| `SUPABASE_URL` | `https://uzfqprefucc....supabase.co` | URL de tu proyecto Supabase. |
| `SUPABASE_ANON_KEY` | `eyJxh...` | Tu `anon public key` de Supabase. |

> **(*) NOTA SOBRE POSTGRES_URL:**
> Ve a Supabase -> Project Settings -> Database -> Connection String -> URI.
> Copia la cadena. **¡Asegúrate de poner tu contraseña real donde dice `[YOUR-PASSWORD]`!**
> *Tip: Usa el puerto 6543 (Transaction Mode) si está disponible, es mejor para serverless.*

Una vez agregadas todas, haz clic en **"Deploy"**.

---

## 🚀 Paso 4: El Despliegue

Vercel empezará a construir tu proyecto. Verás una terminal en pantalla haciendo cosas.
*   Instalará dependencias (`npm install`).
*   Construirá el frontend `npm run build`.
*   Preparará las Serverless Functions (`/api`).

Si todo sale bien, verás una pantalla de **"Congratulations!"** con confeti. 
Haz clic en la imagen de preview para visitar tu sitio.

---

## 🗄️ Paso 5: Inicializar la Base de Datos

Aunque el sitio cargue, el registro y login fallarán si no has creado las tablas en Supabase.

1.  Ve a **Supabase** -> **SQL Editor**.
2.  Copia el contenido del archivo `schema.sql` de tu proyecto.
3.  Pégalo en el editor y dale **RUN**.
4.  Asegúrate de que diga "Success".

---

## ✅ Verificación Final

1.  Entra a la URL de tu nuevo sitio (ej: `https://cv-creator.vercel.app`).
2.  Ve a la pestaña **"Nube"**.
3.  Intenta **Registrarte** con un email y contraseña.
4.  Si funciona y te dice "Registro exitoso", ¡felicidades! Tu backend y base de datos están conectados.
5.  Inicia sesión y prueba **"Guardar CV"**.

---

## 🆘 Solución de Problemas Comunes

*   **Error 500 en Login/Registro:**
    *   Revisa los Logs en Vercel (Pestaña "Logs" en tu dashboard).
    *   Seguramente la `POSTGRES_URL` está mal (contraseña incorrecta o formato mal).
    *   O no has corrido el script SQL en Supabase.
*   **Error 404 en /api/...:**
    *   Asegúrate de que el archivo `vercel.json` esté en la raíz de tu repositorio. Vercel lo necesita para saber cómo redirigir el tráfico.
