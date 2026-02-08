# 🧪 Testing

## Configuración

### Instalar dependencias
```bash
npm install
```

### Archivos de configuración
- `jest.config.js` - Configuración de Jest
- `__tests__/` - Carpeta con todos los tests

---

## Ejecutar Tests

### Todos los tests
```bash
npm test
```

### Tests en modo watch (ejecuta al cambiar archivos)
```bash
npm run test:watch
```

### Ver cobertura de código
```bash
npm run test:coverage
```

---

## Tests Implementados

### 1. **Autenticación JWT** (`__tests__/routes/auth.test.js`)
- ✅ Login con credenciales válidas
- ✅ Rechazo de credenciales inválidas
- ✅ Validación de campos requeridos
- ✅ Rechazo de usuario incorrecto

### 2. **Validación de Entrada** (`__tests__/middleware/validation.test.js`)
- ✅ DNI: Solo 8 dígitos
- ✅ Nombres: Solo letras y espacios
- ✅ Tipos de asistencia: entrada/salida
- ✅ Formato de fecha: YYYY-MM-DD

### 3. **Middleware de Auth** (`__tests__/middleware/auth.test.js`)
- ✅ Generación de token válido
- ✅ Verificación de token válido
- ✅ Rechazo sin token
- ✅ Rechazo de token inválido
- ✅ Rechazo de token expirado

---

## Salida Esperada

```
 PASS  __tests__/routes/auth.test.js
 PASS  __tests__/middleware/validation.test.js
 PASS  __tests__/middleware/auth.test.js

Test Suites: 3 passed, 3 total
Tests:       25 passed, 25 total
Snapshots:   0 total
Time:        2.5s
```

---

## Estructura de un Test

```javascript
describe('Descripción general', () => {
  it('Caso específico a probar', () => {
    // Preparar datos
    const input = { ... };
    
    // Ejecutar función
    const result = myFunction(input);
    
    // Verificar resultado
    expect(result).toBe(expectedValue);
  });
});
```

---

## Próximos Tests Recomendados

- [ ] Tests de controladores (personal y asistencias)
- [ ] Tests de base de datos
- [ ] Tests de integración completa
- [ ] Coverage objetivo: 80%+

---

## Debugging Tests

### Ver más detalles
```bash
npm test -- --verbose
```

### Ejecutar un test específico
```bash
npm test -- auth.test.js
```

### Parar en la primera falla
```bash
npm test -- --bail
```

---

## Integración Continua (CI/CD)

Para usar en GitHub Actions:

```yaml
- name: Run tests
  run: npm test -- --coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

