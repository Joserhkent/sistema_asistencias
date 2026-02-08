# 🛡️ Protecciones contra SQL Injection

## ¿Qué cambios se hicieron?

### 1. **Validación de Entrada con express-validator**

Se agregó validación en todas las rutas:

```javascript
// Validar DNI: exactamente 8 dígitos
body('dni').matches(/^\d{8}$/)

// Validar nombre: máximo 100 caracteres, solo letras
body('nombre').matches(/^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/)

// Validar tipo: solo 'entrada' o 'salida'
body('tipo').isIn(['entrada', 'salida'])
```

### 2. **Sanitización de Datos**

- `.trim()` - Elimina espacios en blanco
- `.escape()` - Escapa caracteres especiales HTML/SQL
- `.matches()` - Validación con expresiones regulares

### 3. **Queries Parametrizadas** (Ya estaban implementadas)

```javascript
// ✅ SEGURO - Usa parámetros ($1, $2)
const result = await pool.query(
  'SELECT * FROM personal WHERE dni = $1',
  [dni]  // El valor se pasa separado de la query
);

// ❌ INSEGURO - Concatenación directa (NUNCA hacer esto)
const result = await pool.query(`SELECT * FROM personal WHERE dni = '${dni}'`);
```

---

## Ejemplos de Ataques Prevenidos

### Ataque 1: SQL Injection básico
```
Input malicioso: 12345678' OR '1'='1
Resultado sin protección: SELECT * FROM personal WHERE dni = '12345678' OR '1'='1'
Resultado con protección: Rechazado por validación (no es 8 dígitos)
```

### Ataque 2: XSS (Cross-Site Scripting)
```
Input: <script>alert('hacked')</script>
Resultado sin protección: Almacena script en BD
Resultado con protección: Se escapa a &lt;script&gt;...
```

### Ataque 3: Union-based injection
```
Input: 12345678' UNION SELECT * FROM usuarios--
Resultado: Rechazado por validación (no son 8 dígitos)
```

---

## Capas de Protección

| Capa | Tecnología | Función |
|------|-----------|----------|
| Input | express-validator | Validar formato y contenido |
| Transport | Queries parametrizadas | Evitar inyección de código |
| Output | .escape() | Sanitizar antes de guardar |
| BD | Constraints, índices | Validación a nivel BD |

---

## Checklist de Seguridad Implementado

- ✅ Validación de entrada en todas las rutas
- ✅ Queries parametrizadas con pg library
- ✅ Escape de caracteres especiales
- ✅ Validación de formato (DNI 8 dígitos, etc.)
- ✅ Límites de longitud en campos
- ✅ Whitelist de valores permitidos (tipo: entrada/salida)
- ✅ Error messages genéricos (no revelar BD)

---

## Próximas Mejoras Recomendadas

1. **Rate Limiting**: Limitar intentos fallidos
2. **HTTPS**: Encriptar datos en tránsito
3. **JWT**: Autenticar requests (Tarea 3)
4. **Logging**: Registrar intentos sospechosos
5. **CORS restrictivo**: Ya implementado

