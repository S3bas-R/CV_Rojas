-- Tabla de Usuarios (Manejada por Supabase Auth, pero si necesitas datos extra)
-- Nota: Supabase Auth usa su propia tabla `auth.users`, no deberías crear una tabla `users` separada a menos que sea para perfiles públicos.
-- Reemplazaremos la tabla actual para que user_id sea UUID, compatible con Supabase Auth.

-- Eliminar tablas anteriores si existen (Cuidado: borra datos)
DROP TABLE IF EXISTS cv_data;
DROP TABLE IF EXISTS users; -- Ya no la usaremos, usaremos auth.users de Supabase

-- Tabla para guardar los datos del CV
CREATE TABLE IF NOT EXISTS cv_data (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL, -- Cambiado de INTEGER a UUID para coincidir con Supabase Auth
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE cv_data ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver y editar SU propio CV
CREATE POLICY "Usuarios pueden ver su propio CV" ON cv_data
  FOR ALL
  USING (auth.uid() = user_id);
