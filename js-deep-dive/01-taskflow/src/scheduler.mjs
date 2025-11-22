import { createTaskStore } from './taskStore.mjs';

console.log('Scheduler module evaluado...');

// Un único store para este módulo (singleton dentro del móulo)
const taskStore = createTaskStore();

/**
 * Llena el store con algunas tareas de ejemplo.
 * Aquí todavía no se usa asincronía, solo funciones normales.
 */

export function seedExampleTasks() {
  // limpiamos primero, por si se llama más de una vez
  taskStore.clear();

  taskStore.addTask({
    label: 'Saludar al usuario',
    run: () => {
      console.log('👋 Hola desde una tarea síncrona!');
    },
  });

  //   taskStore.addTask({
  //     label: 'Mostrar fecha actual',
  //     run: () => {
  //       console.log('📅 Hoy es', new Date().toLocaleString());
  //     },
  //   });

  // 2) Tarea asíncrona con Promesa
  taskStore.addTask({
    label: 'Simular petición de API',
    run: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('📡 Respuesta simulada de API');
        }, 1000);
      });
    },
  });

  // 3) Async/Awai directo
  taskStore.addTask({
    label: 'Esperar 500ms',
    run: async () => {
      await new Promise((r) => setTimeout(r, 500));
      return '⏱ 500ms completados';
    },
  });

  // 4) Tarea que falla
  taskStore.addTask({
    label: 'Tarea com error',
    run: () => {
      throw new Error('Simulación de error');
    },
  });
}

/**
 * Imprime la lista de tareas actuales.
 */
export function debugPrintTasks() {
  const tasks = taskStore.getTasks();
  console.log('📋 Tareas actuales:');
  //   for (const task of tasks) {
  //     console.log(
  //       `- #${task.id} :: ${
  //         task.label
  //       } (creada: ${task.createdAt.toLocaleString()})`,
  //     );
  //   }

  for (const task of tasks) {
    console.log(
      `- ${task.describe()} (creada: ${task.createdAt.toLocaleString()})`,
    );
  }
}

/**
 * Ejecuta todas las tareas del store.
 */

export async function runAllTasks() {
  const tasks = taskStore.getTasks();
  console.log('▶ Ejecutando todas las tareas ASYNC...');
  //   for (const task of tasks) {
  //     console.log(`\n▶ Tarea #${task.id}: ${task.label}`);
  //     task.run();
  //   }

  for (const task of tasks) {
    console.log(''); //Línea en blanco
    //task.execute();
    try {
      await task.execute();
    } catch {
      // El error ya fue loggeado en execute, no repetimos
    }
  }
  console.log('\n🏁 Todas las tareas finalizadas');
}
