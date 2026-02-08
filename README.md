# 🏢 Sistema de Asistencias

## 📌 Descripción

Sistema web de control de asistencias para personal de empresa. Permite registrar entrada/salida, generar reportes y gestionar personal.

**Stack:**
- **Frontend:** React 19
- **Backend:** Node.js + Express 5
- **BD:** PostgreSQL
- **Autenticación:** JWT

---

## 🚀 Instalación Rápida

### 1️⃣ Requisitos
- Node.js 18+
- PostgreSQL 12+
- npm o yarn

### 2️⃣ Clonar y configurar

```bash
# Clonar repo
git clone <tu-repo>
cd sistema_asistencias

# Configurar Backend
cd backend
cp .env.example .env
# ⚠️ Editar .env con tus valores reales
npm install

# Configurar Frontend
cd ../sistema
cp .env.example .env
npm install
```

### 3️⃣ Base de Datos

```bash
# Crear base de datos
createdb sistema

# Inicializar tablas
psql sistema -f backend/config/init.sql
```

### 4️⃣ Iniciar servidores

```bash
# Terminal 1: Backend (Puerto 4000)
cd backend
npm start

# Terminal 2: Frontend (Puerto 3000)
cd sistema
npm start
```

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [SECURITY_IMPROVEMENTS.md](SECURITY_IMPROVEMENTS.md) | ✨ Todas las mejoras implementadas |
| [DEPLOYMENT.md](DEPLOYMENT.md) | 🚀 Guía de despliegue a producción |
| [backend/SECURITY.md](backend/SECURITY.md) | 🛡️ Detalles de protecciones |
| [backend/JWT_AUTH.md](backend/JWT_AUTH.md) | 🔑 Autenticación JWT |
| [backend/TESTING.md](backend/TESTING.md) | 🧪 Testing y cobertura |

---

## 🔐 Seguridad Implementada

✅ **Variables de Entorno** - Sin credenciales en código  
✅ **Validación de Input** - Protección contra SQL Injection  
✅ **Autenticación JWT** - Control de acceso  
✅ **CORS configurado** - Acceso restringido  
✅ **Tests automatizados** - Cobertura de seguridad  

---

## 📊 Credenciales por Defecto

```
Usuario: admin
Contraseña: [Editar en .env ADMIN_PASSWORD]
```

⚠️ **CAMBIAR EN PRODUCCIÓN**

---

## 🔄 Estructura de Carpetas

```
sistema_asistencias/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── init.sql
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── asistenciaController.js
│   │   └── personalController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── personal.js
│   │   └── asistencias.js
│   ├── __tests__/
│   │   └── (test cases)
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── index.js
├── sistema/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Asistencia.js
│   │   │   └── ...
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── SECURITY_IMPROVEMENTS.md
├── DEPLOYMENT.md
└── .gitignore
```

---

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Ver cobertura
npm run test:coverage

# Modo watch
npm run test:watch
```

**Coverage actual:** 25+ test cases  
- ✅ Autenticación
- ✅ Validación
- ✅ JWT

---

## 🌐 Endpoints API

### Autenticación (Público)
```
POST   /api/auth/login        - Obtener JWT
GET    /api/auth/validate     - Validar token (protegido)
```

### Personal (Protegido)
```
GET    /api/personal          - Listar todos
GET    /api/personal/:dni     - Por DNI
POST   /api/personal          - Crear
PUT    /api/personal/:dni     - Actualizar
DELETE /api/personal/:dni     - Eliminar
```

### Asistencias (Protegido)
```
GET    /api/asistencias              - Listar todas
GET    /api/asistencias?fecha=YYYY-MM-DD - Por fecha
GET    /api/asistencias/reporte/:fecha   - Reporte
GET    /api/asistencias/empleado/:dni    - Por empleado
POST   /api/asistencias              - Registrar
```

---

## 💰 Costos de Hosting Estimados

### Opción 1: Todo en Uno (Recomendado)
- **Railway.app o Render.com**
- Frontend + Backend + BD: $5-15/mes
- Anual: $60-180 USD

### Opción 2: Separado
- Vercel (Frontend): Gratis
- Railway (Backend): $10/mes
- BD PostgreSQL: $10/mes
- Anual: ~$240 USD

### Opción 3: Propio Servidor
- DigitalOcean VPS: $4-6/mes
- Mantenimiento: tu tiempo
- Anual: ~$100 USD

---

## 🐛 Troubleshooting

### Error de conexión a BD
```bash
# Verificar BD existe
psql -l | grep sistema

# Recrear BD
dropdb sistema
createdb sistema
psql sistema -f backend/config/init.sql
```

### Puerto 3000/4000 ocupado
```bash
# Cambiar en .env
PORT=5000
REACT_APP_API_URL=http://localhost:5000/api
```

### Token expirado
```bash
# Frontend rechaza request → Redirige a login
# Nuevo login genera nuevo token
```

---

## 📞 Soporte

- **Documentación:** Ver carpeta raíz
- **Tests:** `npm test` en backend/
- **Logs:** Verificar terminal del servidor

---

## 📝 Licencia

Corporación R&L Service © 2024

---

## ✅ Checklist Pre-Producción

- [ ] .env configurado con valores reales
- [ ] JWT_SECRET generado (32+ chars)
- [ ] Contraseña admin fuerte
- [ ] Base de datos respaldada
- [ ] Tests pasando (npm test)
- [ ] HTTPS habilitado en dominio
- [ ] CORS configurado para dominio real
- [ ] Logs centralizados
- [ ] Backups automáticos
- [ ] Monitoreo de errores

---

**Última actualización:** 8 de febrero de 2026  
**Versión:** 1.1.0 (Seguridad mejorada)

