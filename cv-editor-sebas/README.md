# CV Editor Full-Stack - Sebastián Rojas

Este proyecto es un Portafolio y Editor de CV Profesional Full-Stack desarrollado con React, Tailwind CSS, y un backend Serverless en Vercel con PostgreSQL.

**Características:**
- 🎨 **Frontend Moderno:** React + Vite + TailwindCSS + Framer Motion.
- 🛠 **Componentes Modulares:** Arquitectura limpia y mantenible.
- 💾 **Persistencia de Datos:** Backend robusto con PostgreSQL.
- ☁ **Nube:** Despliegue optimizado para Vercel y Cloudflare.
- 🔒 **Seguridad:** Protección contra SQL Injection y XSS.

---

## 🚀 Configuración Local

### Prerrequisitos
- Node.js (v18+)
- PostgreSQL (Base de datos local, Vercel Postgres, o [Supabase](./README_SUPABASE.md))

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

## ☁ Despliegue en Vercel (Recomendado)

Vercel es la plataforma ideal para este proyecto ya que soporta las Serverless Functions (`/api`) nativamente.

1. **Subir a GitHub:** Sube tu código a un repositorio de GitHub.
2. **Crear Proyecto en Vercel:**
   - Ve a [vercel.com](https://vercel.com) -> "Add New..." -> "Project".
   - Importa tu repositorio de GitHub.
3. **Configuración de Build:**
   - Framework Preset: **Vite**.
   - Root Directory: `./` (raíz).
4. **Base de Datos (Vercel Postgres):**
   - En el dashboard de tu proyecto en Vercel, ve a "Storage" y crea una base de datos "Postgres".
   - Vercel configurará automáticamente las variables de entorno (`POSTGRES_URL`, etc.).
   - Ve a la pestaña "Data" de tu base de datos y ejecuta el contenido de `schema.sql` en la consola SQL integrada ('Query').
5. **Variables de Entorno Adicionales:**
   - Agrega `JWT_SECRET` en Settings -> Environment Variables.
6. **Deploy:** Vercel construirá y desplegará tu aplicación automáticamente.

---

## ⚡ Despliegue en Cloudflare Pages

Cloudflare Pages es excelente para el Frontend estático. Para el backend, necesitarías usar Cloudflare Workers, lo cual requeriría adaptar los endpoints de `api/`.

1. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
2. **Nota sobre Backend:**
   - Si despliegas **solo** en Cloudflare Pages, la carpeta `api/` (funciones serverless de Vercel) **NO funcionará** nativamente.
   - **Opción Híbrida:** Despliega el Frontend en Cloudflare Pages y el Backend en Vercel o Render, y actualiza la URL de la API en el frontend.

---

## 🛡 Seguridad

- **SQL Injection:** Todas las consultas a la base de datos utilizan *parameterized queries* (`$1`, `$2`) para prevenir inyecciones.
- **XSS:** React escapa automáticamente el contenido renderizado. Además, se recomienda validar inputs en el backend.
- **Auth:** Hash de contraseñas con `bcryptjs` y manejo de sesiones con `jsonwebtoken`.

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
