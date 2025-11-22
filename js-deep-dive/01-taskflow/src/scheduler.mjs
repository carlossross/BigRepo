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
      console.log('👋 Hola desde una tarea!');
    },
  });

  taskStore.addTask({
    label: 'Mostrar fecha actual',
    run: () => {
      console.log('📅 Hoy es', new Date().toLocaleString());
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

export function runAllTasks() {
  const tasks = taskStore.getTasks();
  console.log('▶ Ejecutando todas las tareas...');
  //   for (const task of tasks) {
  //     console.log(`\n▶ Tarea #${task.id}: ${task.label}`);
  //     task.run();
  //   }

  for (const task of tasks) {
    console.log(''); //Línea en blanco
    task.execute();
  }
}
