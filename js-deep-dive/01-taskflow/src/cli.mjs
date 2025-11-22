console.log('TaskFlow CLI cargado...');

// import {
//   debugPrintTasks,
//   runAllTasks,
//   seedExampleTasks,
// } from './scheduler.mjs';

// // 1) Preparamos algunas tareas
// seedExampleTasks();

// // 2) Mostramos el estado interno del store (a través de la API)
// debugPrintTasks();

// // 3) Ejecutamos todas las tareas
// //runAllTasks();
// // CLI acepta promesas sin necesidad de catch porque Node maneja el rejection si olvidamos.
// await runAllTasks();

import {
  seedCancelableTasksDemo,
  debugPrintTasks,
  runAllTasks,
  cancelTask,
  // cancelAllTasks, // por si quieres probarlo luego
} from './scheduler.mjs';

// 1) Preparamos solo la demo de cancelación
seedCancelableTasksDemo();
debugPrintTasks();

// 2) Programamos una cancelación 1s después de que empiece la ejecución
setTimeout(() => {
  console.log('\n🛑 CLI: enviando cancelación a la tarea #1');
  cancelTask(1);
}, 1000);

// 3) Ejecutamos las tareas (secuencial en este caso, pero solo hay una)
await runAllTasks();

console.log('\n🏁 CLI: demo de cancelación terminada');
