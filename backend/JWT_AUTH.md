# 🔐 Autenticación JWT

## ¿Cómo funciona?

### 1. **Login**
```
Usuario ingresa credenciales → Backend valida → Backend genera JWT
```

### 2. **Almacenamiento**
```
JWT se guarda en localStorage del navegador
```

### 3. **Acceso a API**
```
Cada request incluye el token en header: Authorization: Bearer <token>
```

### 4. **Validación**
```
Backend verifica token antes de procesar requests
Si token inválido/expirado → Error 401
```

---

## Flujo de Autenticación

### Backend (Node.js + Express)

```javascript
// 1. Login: POST /api/auth/login
{
  "username": "admin",
  "password": "your_password"
}

// Respuesta:
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": "24h"
}

// 2. Requests a rutas protegidas
GET /api/personal
Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

// 3. Validar token: GET /api/auth/validate
Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Frontend (React)

```javascript
// 1. Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ username, password })
});

// 2. Guardar token
localStorage.setItem('token', response.token);

// 3. Usar token en requests
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
};

fetch('/api/personal', { headers });
```

---

## Variables de Entorno Requeridas

### Backend (.env)

```bash
# Generar con: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_super_secret_key_32_chars_minimum

# Credenciales admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_strong_password
```

---

## Tokens JWT

### Estructura

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIn0.XZK...

[Header].[Payload].[Signature]
```

### Decodificación (en jwt.io)

```json
{
  "username": "admin",
  "role": "admin",
  "loginTime": "2024-02-08T10:30:00Z",
  "exp": 1707388200,
  "iat": 1707301800
}
```

### Expiración

- Por defecto: **24 horas**
- Configurable en: `backend/controllers/authController.js`

---

## Seguridad

| Aspecto | Medida |
|--------|--------|
| **Almacenamiento** | localStorage (acceso desde DevTools) |
| **Transmisión** | Debe usar HTTPS en producción |
| **Expiración** | 24 horas |
| **Secret** | Mínimo 32 caracteres, único por servidor |
| **Validación** | Verificado en cada request protegido |

---

## Logout

```javascript
// Frontend
localStorage.removeItem('token');
localStorage.removeItem('autenticado');
localStorage.removeItem('loginTime');

// El usuario se redirige a login
```

---

## Manejo de Errores

### Token Expirado
```javascript
// Respuesta del servidor
{
  "error": "Token expirado"
}

// Frontend debe redirigir a login
```

### Token Inválido
```javascript
{
  "error": "Token inválido"
}
```

### Credenciales Inválidas
```javascript
{
  "error": "Credenciales inválidas"
}
```

---

## Próximos Pasos Recomendados

1. ✅ Implementado: JWT básico
2. 🔄 Mejora: Refresh tokens (extender sesión sin re-login)
3. 🔄 Mejora: Roles y permisos (admin, supervisor, user)
4. 🔄 Mejora: Logout seguro (blacklist de tokens)
5. 🔄 Mejora: 2FA (autenticación de dos factores)

