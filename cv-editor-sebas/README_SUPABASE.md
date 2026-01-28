# ⚡ Guía de Integración con Supabase

Esta guía te explicará cómo configurar **Supabase** como tu base de datos PostgreSQL para el proyecto **CV Editor Full-Stack**.

Supabase es una excelente alternativa "Open Source" a Firebase que te ofrece una base de datos PostgreSQL completa, autenticación y mucho más. En este proyecto utilizaremos su base de datos PostgreSQL.

---

## 🚀 Pasos para Configurar

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

4. Pega el código SQL en el editor de Supabase y haz clic en **"Run"**. Ensure you see "Success".

### 5. ¡Listo!
Tu aplicación ahora está conectada a Supabase.

- Cuando un usuario se registre desde el frontend, se creará una fila en la tabla `users` de Supabase.
- Cuando guarden su CV, se guardará el JSON en la tabla `cv_data`.

---

## 🔍 Verificando los datos
Puedes ver tus datos en tiempo real en Supabase yendo al **Table Editor** (ícono de tabla en la barra lateral). Allí verás las tablas `users` y `cv_data` y podrás inspeccionar los registros creados por tu aplicación.
