console.log('Utils module evaluado…');

/**
 * Delay que respeta AbortSignal.
 *
 * - Si la signal ya viene abortada, rechaza al instante.
 * - Si se aborta durante la espera, limpia el timeout y rechaza.
 * - Si no se aborta, resuelve después de ms.
 */
export function abortableDelay(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(new Error('Delay abortado antes de iniciar'));
    }

    const timer = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    const onAbort = () => {
      cleanup();
      reject(new Error('Delay abortado'));
    };

    const cleanup = () => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    };

    signal?.addEventListener('abort', onAbort, { once: true });
  });
}
