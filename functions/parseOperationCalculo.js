function parseOperationCalculo(Sentencia) {
    // Extraer el nombre de la tabla y la condición completa
    const regexTabla = /\{\s*\w\s*\|\s*([a-zA-Z0-9_]+)\(\w\)\s*(.*)\s*\}/;
    const matchesTabla = Sentencia.match(regexTabla);
    if (!matchesTabla) {
        return 'Sentencia inválida';
    }
    const tabla = matchesTabla[1];

    // Extraer la condición completa, si existe
    let condicion = matchesTabla[2] ? matchesTabla[2] : '';

    // Reemplazar operadores lógicos y ajustar el prefijo de las condiciones
    condicion = condicion.replace(/\s*∧\s*/g, ' AND ').replace(/\s*∨\s*/g, ' OR ').trim();

    // Eliminar el prefijo de las condiciones
    condicion = condicion.replace(/\w\./g, '');

    // Verificar si la condición comienza con AND/OR y eliminarlo si es necesario
    if (condicion.startsWith('AND ')) {
        condicion = condicion.substring(4);
    } else if (condicion.startsWith('OR ')) {
        condicion = condicion.substring(3);
    }

    // Construir y retornar la sentencia SQL
    return `SELECT * FROM ${tabla}${condicion ? ' WHERE ' + condicion : ''}`;
}

// Ejemplo de uso con múltiples condiciones
const sentenciaMultiple = "{f | Estudiantes_BD(f) ∧ f.Ingreso<2020}";
console.log(parseOperationCalculo(sentenciaMultiple));