export function parseOperationCalculo(Sentencia) {

    // Verificar si la sentencia incluye una unión
    if (Sentencia.includes('V') || Sentencia.includes('U')) {
        // Dividir la sentencia en las dos partes de la unión
        const unionSymbol = Sentencia.includes('U') ? 'U' : 'V';
        const [leftSentencia, rightSentencia] = Sentencia.split(unionSymbol).map(s => s.trim());
        const leftQuery = parseOperationCalculo(leftSentencia);
        const rightQuery = parseOperationCalculo(rightSentencia);
        
        // Devolver la consulta SQL con la unión
        return `${leftQuery} UNION ${rightQuery}`;
    }

    // Extraer el nombre de la tabla y la condición completa
    const regexTabla = /\{\s*(\w(?:\.\w+)?(?:,\s*\w(?:\.\w+)?)*)\s*\|\s*([a-zA-Z0-9_]+)\(\w\)\s*(.*)\s*\}/;
    const matchesTabla = Sentencia.match(regexTabla);
    if (!matchesTabla) {
        return 'Sentencia inválida';
    }
    // const tabla = matchesTabla[1];
    let proyeccion = matchesTabla[1].trim();
    

    // Extraer la condición completa, si existe
    // let condicion = matchesTabla[2] ? matchesTabla[2] : '';
    const tabla = matchesTabla[2].trim();
    let condicion = matchesTabla[3] ? matchesTabla[3].trim() : '';

    // Reemplazar operadores lógicos y ajustar el prefijo de las condiciones
    condicion = condicion.replace(/\s*∧\s*/g, ' AND ').replace(/\s*∨\s*/g, ' OR ').trim();

    // Eliminar el prefijo de las condiciones
    condicion = condicion.replace(/\w\./g, '');
    proyeccion = proyeccion.replace(/\b\w\./g, '');

    // Verificar si la condición comienza con AND/OR y eliminarlo si es necesario
    if (condicion.startsWith('AND ')) {
        condicion = condicion.substring(4);
    } else if (condicion.startsWith('OR ')) {
        condicion = condicion.substring(3);
    }
    if (proyeccion === 'f') {
        proyeccion = '*';
    }
    // Construir y retornar la sentencia SQL
    // return `SELECT * FROM ${tabla}${condicion ? ' WHERE ' + condicion : ''}`;
    return `SELECT ${proyeccion} FROM ${tabla}${condicion ? ' WHERE ' + condicion : ''}`;
}

// Ejemplo de uso con múltiples condiciones
const sentenciaMultiple = "{f | Estudiantes_BD(f) ∧ f.Ingreso<2020}";
console.log("seleccion: ",parseOperationCalculo(sentenciaMultiple)); // "SELECT * FROM Estudiantes_BD WHERE Ingreso < 2020"

// Ejemplo de uso con proyección
const sentenciaMultiple2 = "{f.rut, f.nombre | Estudiantes_BD(f)}";
console.log("proyeccion: ",parseOperationCalculo(sentenciaMultiple2)) //  "SELECT Nombre, Edad FROM Estudiantes_BD"

// Ejemplo de uso con selección y proyección
const sentenciasp = "{f.rut, f.nombre | Estudiantes_BD(f) ∧ f.Ingreso<2020}";
console.log("seleccion y proyeccion: ",parseOperationCalculo(sentenciasp))// "SELECT Nombre, Edad FROM Estudiantes_BD WHERE Ingreso < 2020"

// Ejemplo de uso con unión utilizando 'V'
const sentenciaUnionV = "{f.rut, f.nombre | Estudiantes_BD(f) ∧ f.Ingreso<2020} V {f.rut, f.nombre | Estudiantes_POO(f) ∧ f.Ingreso<2022}";
// Ejemplo de uso con unión utilizando 'U'
const sentenciaUnionU = "{f.rut, f.nombre | Estudiantes_BD(f) ∧ f.Ingreso<2020} U {f.rut, f.nombre | Estudiantes_POO(f) ∧ f.Ingreso<2022}";
console.log("union U: ", parseOperationCalculo(sentenciaUnionV)); // "SELECT rut, nombre FROM Estudiantes_BD WHERE Ingreso < 2020 UNION SELECT rut, nombre FROM Estudiantes_BI WHERE Ingreso < 2022"
console.log("union V: ", parseOperationCalculo(sentenciaUnionU)); // "SELECT rut, nombre FROM Estudiantes_BD WHERE Ingreso < 2020 UNION ALL SELECT rut, nombre FROM Estudiantes_BI WHERE Ingreso < 2022"