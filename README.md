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

**Última actualización:** 8 de febrero de 2026  
**Versión:** 1.1.0 (Seguridad mejorada)

