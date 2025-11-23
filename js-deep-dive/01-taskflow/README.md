# TaskFlow — Diario Técnico del Camino Senior 🥋

Este documento registra, en orden cronológico, cada iteración del proyecto **TaskFlow**, explicando qué conceptos de JavaScript profundo se aplican, qué decisiones se tomaron y qué trampas comunes se deben evitar. Sirve como bitácora técnica para entrevistas, repaso y claridad mental.

---

## 🧱 Iteración 0 — Setup inicial (ESM + Execution Context)

**Objetivo**:
Crear la estructura del proyecto, habilitar ESM en Node, y confirmar cómo se ejecutan los módulos.

**Archivos creados:**

- `package.json`
- `src/cli.mjs`
- `src/scheduler.mjs`

**Conceptos aplicados:**

1. **ESM real en Node:**

   - `"type": "module"` habilita el modo ESM.
   - Permite usar `import`/`export`, top‑level await, live bindings.

2. **Execution context de módulo:**

   - Cada archivo ESM se evalúa una sola vez.
   - El código en el _top-level_ del módulo se ejecuta cuando se importa.

3. **Orden de evaluación de módulos:**

   - Primero se evalúa el módulo importado.
   - Luego se evalúa el módulo que hace el import.
   - Vimos este orden en la salida de consola:

     - `Scheduler module evaluado…`
     - `TaskFlow CLI cargado…`
     - `Hola desde Scheduler.mjs`

4. **Primer pipeline funcional:**

   - `npm start` ejecuta `node src/cli.mjs`.

5. **Git — flujo profesional:**

   - Se creó rama `feature/00-setup`.
   - Commit temático.
   - Merge con `--no-ff` a `main` para historial claro.

**Estado:**
La base del proyecto está establecida. El entorno está listo para avanzar hacia closures.

---

## Estructura del Proyecto

```
01-taskflow/
  README.md        ← Documentación del proyecto
  package.json     ← Configuración de Node + ESM
  src/             ← Código fuente
    cli.mjs        ← Punto de entrada (CLI)
    scheduler.mjs  ← Primer módulo importado
```

**Razón del orden:**

- La raíz contiene toda la documentación y configuración.
- `src/` aloja únicamente módulos de código.
- Cada iteración del camino senior se documenta en este README.

---

## Próxima Iteración

**Iteración 1 — Construcción del Task Store usando closures.**

Aquí crearemos un módulo que encapsula estado privado sin clases ni objetos literales, usando scope chain y closures reales como si fuera un mini‑Redux, pero puro JavaScript.

---

## Iteración 2 — Task Store con closures

- Implementado `createTaskStore` en `taskStore.mjs`.
- Estado privado (`tasks`, `lastId`) encapsulado vía closures.
- `scheduler.mjs` actúa como orquestador del store:
  - `seedExampleTasks`
  - `debugPrintTasks`
  - `runAllTasks`
- Conceptos reforzados:
  - Lexical environment y scope chain.
  - Closures reales con estado mutando en el tiempo.
  - Single evaluation de módulos ESM con un “singleton” por módulo.

## Iteración 3 — Task como tipo propio (prototipos y clases)

- Se creó `Task` en `task.mjs` primero como function constructor + prototype.
- Luego se refactorizó a `class Task` manteniendo el mismo contrato.
- El `TaskStore` ahora almacena instancias de `Task` y asigna los `id`.
- Conceptos reforzados:
  - `new` y reglas de `this` en constructores.
  - Prototype chain y métodos compartidos.
  - Clases modernas como azúcar sobre prototipos.
  - Single evaluation de módulos que definen tipos.

## Iteración 4 — Asincronía dentro de Task (async/await + Promesas)

- Task.execute() ahora es async, permitiendo manejar funciones sync y async.
- Se soportan tareas con Promesas, timeouts y funciones async/await.
- scheduler.runAllTasks() ahora ejecuta tareas secuencialmente usando await.
- Se agregó manejo de errores sin detener el flujo.
- Se usa top‑level await desde cli.mjs.
- Conceptos reforzados:
- await solo acepta Promesas.
- setTimeout no es async: se envuelve en una Promesa.
- Diferencia entre macrotasks (setTimeout) y microtasks (Promesas).
- Flujo secuencial asíncrono controlado.

## Iteración 5 — AbortController y tareas cancelables

- Cada `Task` ahora tiene su propio `AbortController` y `signal`.
- `Task.execute()` pasa la `signal` a `run(signal)` para que la tarea pueda reaccionar.
- Se creó `abortableDelay(ms, signal)` para simular trabajo cancelable con `setTimeout`.
- El `Scheduler` ahora puede:
  - `cancelTask(id)` para cancelar una tarea específica.
  - `cancelAllTasks()` para cancelar todas las tareas activas.
- Se añadió una demo en CLI que:
  - Inicia una tarea larga (5s).
  - La cancela después de 1s.
- Conceptos reforzados:
  - Uso práctico de `AbortController` y `AbortSignal`.
  - Patrón de construir operaciones “abortables” (delay cancelable).
  - Coordinación entre asincronía, cancelación y logs.

> Este README se irá actualizando en cada iteración, registrando aprendizaje real y decisiones de diseño como lo haría un ingeniero senior.
