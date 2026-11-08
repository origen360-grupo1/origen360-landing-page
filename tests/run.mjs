// Ejecutar desde la raíz: node tests/run.mjs (Node.js 20 o posterior).
import './functional.test.mjs';
import './technical.test.mjs';
import { runTests } from './helpers/test-runner.mjs';

export const result = await runTests();
if (result.failed) throw new Error(result.failed + ' prueba(s) fallaron. Revisa los mensajes FAIL anteriores.');
