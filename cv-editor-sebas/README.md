# CV Creator Full-Stack - Sebastián Rojas

Este proyecto es un Portafolio y Editor de CV Profesional Full-Stack desarrollado con React, Tailwind CSS, y un backend Serverless en Vercel con PostgreSQL (vía Supabase).

## 🌟 Características

- 🎨 **Frontend Moderno:** React + Vite + TailwindCSS + Framer Motion.
- 🛠 **Componentes Modulares:** Arquitectura limpia y mantenible.
- 💾 **Persistencia de Datos:** Backend robusto con PostgreSQL.
- ☁ **Nube:** Despliegue optimizado para Vercel y Cloudflare.
- 🔒 **Seguridad:** Protección contra SQL Injection y XSS.

## 🛠 Justificación de Tecnologías

*   **React + Vite:** Para una interfaz de usuario rápida, reactiva y una experiencia de desarrollo óptima.
*   **Tailwind CSS:** Permite un diseño moderno y responsivo sin salir del HTML, acelerando el desarrollo.
*   **Vercel Serverless Functions:** Permite tener un backend funcional sin gestionar servidores, escalando automáticamente y simplificando el despliegue.
*   **PostgreSQL (Supabase):** Base de datos relacional robusta y estándar en la industria para la persistencia de datos segura.
*   **JWT & Bcrypt:** Estándares de seguridad para autenticación sin estado y almacenamiento seguro de contraseñas.

## 🌐 Versión Desplegada
Accede a la aplicación en vivo aquí: **[Enlace a tu despliegue en Vercel]** (Reemplazar con URL real al desplegar)

---

## 📚 Documentación de API
Puedes consultar la documentación detallada de los endpoints en [API.md](./API.md).

---

## 🚀 Configuración Local

### Prerrequisitos
- Node.js (v18+)
- PostgreSQL (Base de datos local, Vercel Postgres, o Supabase - ver sección abajo)

### Pasos
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/S3bas-R/CV_Rojas.git
   cd cv-editor-sebas
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar Base de Datos:**
   - Asegúrate de tener una instancia de PostgreSQL corriendo.
   - Crea las tablas usando el archivo `schema.sql` provisto en la raíz.

4. **Variables de Entorno:**
   Crea un archivo `.env.local` en la raíz (para Vite) o configura tu entorno:
   ```env
   POSTGRES_URL="postgresql://usuario:password@localhost:5432/tu_base_de_datos"
   JWT_SECRET="tu_secreto_super_seguro"
   ```

5. **Correr en desarrollo:**
   - Frontend (Solo): `npm run dev`
   - Full Stack (con API): Usa `vercel dev` (requiere Vercel CLI) o configura un proxy.

---

# ⚡ Integración con Supabase

Supabase es una excelente alternativa "Open Source" a Firebase que te ofrece una base de datos PostgreSQL completa, autenticación y mucho más. En este proyecto utilizaremos su base de datos PostgreSQL.

## 🚀 Pasos para Configurar Supabase

### 1. Crear Proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com) y regístrate / inicia sesión.
2. Haz clic en **"New Project"**.
3. Selecciona tu organización.
4. Llena los datos:
   - **Name:** `cv-editor-db` (o el que prefieras).
   - **Database Password:** **¡IMPORTANTE!** Genera una contraseña segura y **guárdala** en un lugar seguro. La necesitarás para la cadena de conexión.
   - **Region:** Elige la más cercana a tus usuarios (ej. East US).
5. Haz clic en **"Create new project"**. Espera unos minutos a que se provisione la base de datos.

### 2. Obtener la Cadena de Conexión (Connection String)
1. Una vez creado el proyecto, ve a los **Settings** (ícono de engranaje ⚙️ en la barra lateral izquierda).
2. Ve a la sección **Database**.
3. Busca el apartado **"Connection String"**.
4. Selecciona la pestaña **"URI"**.
5. Copia la cadena que aparece. Se verá algo así:
   ```
   postgresql://postgres.xxxx:[TU-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
   *Nota: Asegúrate de usar el modo "Transaction" (puerto 6543) si estás desplegando en un entorno serverless como Vercel, o "Session" (puerto 5432) para conexiones directas persistentes. Para este proyecto, el puerto 6543 o 5432 funcionarán, pero 6543 es mejor para escalabilidad en serverless.*

### 3. Configurar Variables de Entorno
En tu proyecto local o en el panel de Vercel:

1. **Localmente:** Crea o edita el archivo `.env.local` y agrega:
   ```env
   POSTGRES_URL="tu_cadena_de_conexion_que_copiaste"
   ```
   *(Reemplaza `[TU-PASSWORD]` en la cadena con la contraseña que creaste en el paso 1).*

2. **En Vercel:**
   - Ve a Settings -> Environment Variables.
   - Agrega una nueva variable llamada `POSTGRES_URL`.
   - Pega tu cadena de conexión completa (con la contraseña real).

### 4. Crear las Tablas (Schema)
Necesitamos crear las tablas `users` y `cv_data` en tu nueva base de datos de Supabase.

1. En el panel de Supabase, ve al **SQL Editor** (ícono de terminal `>_` en la barra lateral).
2. Haz clic en **"New Query"**.
3. Copia el contenido del archivo `schema.sql` de este proyecto:

   ```sql
   -- Tabla de Usuarios
   CREATE TABLE IF NOT EXISTS users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );

   -- Tabla para guardar los datos del CV
   CREATE TABLE IF NOT EXISTS cv_data (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
     data JSONB NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     UNIQUE(user_id)
   );
   ```

4. Pega el código SQL en el editor de Supabase y haz clic en **"Run"**. Asegúrate de ver "Success".

### 5. ¡Listo!
Tu aplicación ahora está conectada a Supabase.
- Cuando un usuario se registre desde el frontend, se creará una fila en la tabla `users` de Supabase.
- Cuando guarden su CV, se guardará el JSON en la tabla `cv_data`.

---

# 🚀 Guía Maestra de Despliegue en Vercel

Esta guía te llevará paso a paso para publicar tu aplicación **CV Creator** en internet usando **Vercel** y **Supabase**.

## 📋 Prerrequisitos

Antes de empezar, asegúrate de tener:
1.  **Cuenta en GitHub:** [github.com](https://github.com)
2.  **Cuenta en Vercel:** [vercel.com](https://vercel.com) (puedes entrar con tu cuenta de GitHub).
3.  **Proyecto en Supabase:** Ya configurado (ver pasos anteriores).
4.  **Tu código listo:** Asegúrate de que tu proyecto compila localmente (`npm run build`).

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

## ☁️ Paso 2: Importar Proyecto en Vercel

1.  Ve a tu **Dashboard de Vercel** ([vercel.com/dashboard](https://vercel.com/dashboard)).
2.  Haz clic en el botón blanco **"Add New..."** y selecciona **"Project"**.
3.  En la lista de "Import Git Repository", busca tu repo `cv-creator` y haz clic en **"Import"**.

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

## 🚀 Paso 4: El Despliegue

Vercel empezará a construir tu proyecto. Verás una terminal en pantalla haciendo cosas.
*   Instalará dependencias (`npm install`).
*   Construirá el frontend `npm run build`.
*   Preparará las Serverless Functions (`/api`).

Si todo sale bien, verás una pantalla de **"Congratulations!"** con confeti. 
Haz clic en la imagen de preview para visitar tu sitio.

## 🗄️ Paso 5: Inicializar la Base de Datos

Aunque el sitio cargue, el registro y login fallarán si no has creado las tablas en Supabase.

1.  Ve a **Supabase** -> **SQL Editor**.
2.  Copia el contenido del archivo `schema.sql` de tu proyecto.
3.  Pégalo en el editor y dale **RUN**.
4.  Asegúrate de que diga "Success".

## ✅ Verificación Final

1.  Entra a la URL de tu nuevo sitio (ej: `https://cv-creator.vercel.app`).
2.  Ve a la pestaña **"Nube"**.
3.  Intenta **Registrarte** con un email y contraseña.
4.  Si funciona y te dice "Registro exitoso", ¡felicidades! Tu backend y base de datos están conectados.
5.  Inicia sesión y prueba **"Guardar CV"**.

## 🆘 Solución de Problemas Comunes

*   **Error 500 en Login/Registro:**
    *   Revisa los Logs en Vercel (Pestaña "Logs" en tu dashboard).
    *   Seguramente la `POSTGRES_URL` está mal (contraseña incorrecta o formato mal).
    *   O no has corrido el script SQL en Supabase.
*   **Error 404 en /api/...:**
    *   Asegúrate de que el archivo `vercel.json` esté en la raíz de tu repositorio. Vercel lo necesita para saber cómo redirigir el tráfico.

---

## 📂 Estructura del Proyecto

```
/
├── api/                  # Backend Serverless Functions
│   ├── auth.js           # Login/Register
│   ├── cv.js             # CRUD CV
│   └── db.js             # Conexión DB
├── src/
│   ├── components/       # Componentes React
│   │   ├── editor/       # Formularios de edición
│   │   ├── templates/    # Plantillas de CV
│   ├── constants/        # Textos y Datos iniciales
│   ├── hooks/            # Lógica de estado (useCV)
│   └── App.jsx           # Componente Principal
├── schema.sql            # Script SQL de creación de tablas
└── public/               # Assets estáticos
```
