// Ejecutor secuencial mínimo: funciones async y assert nativo, sin paquetes.
const cases = [];

export function test(name, run) {
    if (cases.some(item => item.name === name)) throw new Error('Prueba duplicada: ' + name);
    cases.push({ name, run });
}

export async function runTests() {
    const results = [];
    for (const item of cases) {
        try {
            await item.run();
            results.push({ name: item.name, passed: true });
            console.log('OK   ' + item.name);
        } catch (error) {
            results.push({ name: item.name, passed: false, error: error.message });
            console.error('FAIL ' + item.name + '\n' + error.message);
        }
    }
    const passed = results.filter(item => item.passed).length;
    console.log('\nResultado: ' + passed + '/' + results.length + ' pruebas satisfactorias.');
    return { total: results.length, passed, failed: results.length - passed, results };
}
