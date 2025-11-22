console.log('Task module evaluado...');

/**
 * Constructor de Task (forma ES5/ES clásica)
 *
 * Cada Task tiene:
 * - label: descripción
 * - run: función que se ejcuta
 * - createsAt: fecha de creación
 */

// export function Task(label, run) {
//   // Protección por su se olvida el "new"
//   if (!(this instanceof Task)) {
//     return new Task(label, run);
//   }

//   this.label = label;
//   this.run = run;
//   this.createdAt = new Date();
//   this.id = null; //el id se asignará en el store
// }

/**
 * Método compartido vía prototype.
 * No se recrea por instancia
 */
// Task.prototype.describe = function () {
//   return `Task(${this.id ?? '?'}) :: ${this.label})`;
// };

/**
 * Método de ejecucicón.
 * Más adelante aquí metermos lógica asíncrona.
 */
// Task.prototype.execute = function () {
//   console.log(`▶ Ejecutando ${this.describe()}`);
//   // Delegamos a la función run original
//   this.run();
// };

/**
 * Usando class
 */

export class Task {
  constructor(label, run) {
    this.label = label;
    this.run = run;
    this.createdAt = new Date();
    this.id = null;
  }

  describe() {
    return `Task(${this.id ?? '?'}) :: ${this.label}`;
  }

  async execute() {
    console.log(`▶ Ejecutando ${this.describe()}`);
    // this.run();
    try {
      // Ejecutamos la función run (puede ser sync o async)
      const result = await this.run();
      console.log(`✔ Task(${this.id}) completada`, result);
      return result;
    } catch (err) {
      console.log(`❌ Task(${this.id}) falló:`, err);
      throw err;
    }
  }
}
