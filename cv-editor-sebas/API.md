# Documentación de API - CV Creator

## Endpoints

### 1. Autenticación

#### `POST /api/auth`
Maneja el registro e inicio de sesión de usuarios.

**Cuerpo de la Solicitud (JSON):**

*   **Registro:**
    ```json
    {
      "action": "register",
      "email": "usuario@ejemplo.com",
      "password": "tu_password_seguro"
    }
    ```
    *Respuesta Exitosa (201):*
    ```json
    {
      "message": "Usuario creado",
      "user": { "id": 1, "email": "usuario@ejemplo.com" }
    }
    ```

*   **Login:**
    ```json
    {
      "action": "login",
      "email": "usuario@ejemplo.com",
      "password": "tu_password_seguro"
    }
    ```
    *Respuesta Exitosa (200):*
    ```json
    {
      "token": "eyJhbGciOiJIUzI1Ni...",
      "user": { "id": 1, "email": "usuario@ejemplo.com" }
    }
    ```

---

### 2. Gestión de CV

#### `GET /api/cv`
Obtiene los datos del CV del usuario autenticado.

**Headers:**
*   `Authorization`: `Bearer [TU_TOKEN_JWT]`

*Respuesta Exitosa (200):*
Devuelve el objeto JSON con todos los datos del CV.

#### `POST /api/cv`
Guarda o actualiza los datos del CV.

**Headers:**
*   `Authorization`: `Bearer [TU_TOKEN_JWT]`

**Cuerpo de la Solicitud (JSON):**
```json
{
  "data": {
    "nombre": "Juan Pérez",
    "titulo": "Desarrollador",
    ... // Objeto completo del CV
  }
}
```

*Respuesta Exitosa (200):*
```json
{
  "message": "CV guardado exitosamente",
  "id": 123
}
```
