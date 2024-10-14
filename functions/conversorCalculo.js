export function conversorCalculo(Sentencia) {


    //Cuantificadores existenciales y universales
    function manejarCuantificadores(condicion, tabla) {
        condicion = condicion.replace(/∃(\w+)\s*\((.*?)\s*∧\s*(.*?)\)/g, (match, variable, subTabla, subCondicion) => {
            return `EXISTS (SELECT 1 FROM ${subTabla.replace(/\(.*/, '')} ${variable} WHERE ${subCondicion})`;
        });
        condicion = condicion.replace(/∀(\w+)\s*\((.*?)\s*→\s*(.*?)\)/g, (match, variable, subTabla, subCondicion) => {
            return `NOT EXISTS (SELECT 1 FROM ${subTabla.replace(/\(.*/, '')} ${variable} WHERE NOT(${subCondicion}))`;
        });
        return condicion;
    }

    // Verificar si la sentencia incluye una unión
    if (Sentencia.includes('V') || Sentencia.includes('U')) {
        // Dividir la sentencia en las dos partes de la unión
        const unionSymbol = Sentencia.includes('U') ? 'U' : 'V';
        const [leftSentencia, rightSentencia] = Sentencia.split(unionSymbol).map(s => s.trim());
        const leftQuery = conversorCalculo(leftSentencia);
        const rightQuery = conversorCalculo(rightSentencia);
        
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


    // Manejar cuantificadores en la condición
    condicion = manejarCuantificadores(condicion, tabla);

    // Reemplazar operadores lógicos y ajustar el prefijo de las condiciones
    condicion = condicion.replace(/\s*∧\s*/g, ' AND ').replace(/\s*∨\s*/g, ' OR ').trim();

    // Eliminar el prefijo de las condiciones
    // Reemplazar el prefijo 'f.' con el nombre de la tabla principal en las condiciones
    condicion = condicion.replace(/\bf\./g, `${tabla}.`);
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



// Ejemplo de uso con cuantificador existencial (∃)
const sentenciaCuantificadores1 = "{f | Estudiantes_BD(f) ∧ ∃g(Estudiantes_POO(g) ∧ f.rut = g.rut)}";
console.log("cuantificador existencial: ", conversorCalculo(sentenciaCuantificadores1)); // SELECT * FROM Estudiantes_BD WHERE EXISTS (SELECT 1 FROM Estudiantes_POO g WHERE Estudiantes_BD.rut = g.rut)
// Este ejemplo busca estudiantes que están tanto en Estudiantes_BD como en Estudiantes_POO

// Ejemplo de uso con cuantificador universal (∀)
const sentenciaCuantificadores2 = "{f | Estudiantes_BD(f) ∧ ∀g(Estudiantes_POO(g) → f.Ingreso <= g.Ingreso)}";
console.log("cuantificador universal: ", conversorCalculo(sentenciaCuantificadores2)); // SELECT * FROM Estudiantes_BD WHERE NOT EXISTS (SELECT 1 FROM Estudiantes_POO g WHERE NOT(Estudiantes_BD.Ingreso <= g.Ingreso))
// Este ejemplo busca estudiantes en Estudiantes_BD cuyo año de ingreso es menor o igual a todos los años de ingreso en Estudiantes_POO

// Ejemplo 2 de uso con cuantificador existencial (∃)
const sentencia1 = "{f | Empleados(f) ∧ ∃g(Departamentos(g) ∧ f.salario > 30000)}";
console.log("cuantificador existencial2: ", conversorCalculo(sentencia1)); // SELECT * FROM Empleados WHERE EXISTS (SELECT 1 FROM Departamentos g WHERE Empleados.salario > 30000)
// Este ejemplo busca empleados que ganan más de 30000 y trabajan en algún departamento

// Ejemplo 2 de uso con cuantificador universal (∀)

const sentencia2 = "{f | Proyectos(f) ∧ ∀g(Empleados(g) → f.presupuesto > g.salario)}";
console.log("cuantificador universal2: ", conversorCalculo(sentencia2)); // SELECT * FROM Proyectos WHERE NOT EXISTS (SELECT 1 FROM Empleados g WHERE NOT(Proyectos.presupuesto > g.salario))
// Este ejemplo busca proyectos cuyo presupuesto es mayor al salario de todos los empleados


// Ejemplo de uso con múltiples condiciones
const sentenciaMultiple = "{f | Estudiantes_BD(f) ∧ f.Ingreso<2020}";
console.log("seleccion: ",conversorCalculo(sentenciaMultiple)); // "SELECT * FROM Estudiantes_BD WHERE Ingreso < 2020"

// Ejemplo de uso con proyección
const sentenciaMultiple2 = "{f.rut, f.nombre | Estudiantes_BD(f)}";
console.log("proyeccion: ",conversorCalculo(sentenciaMultiple2)) //  "SELECT Nombre, Edad FROM Estudiantes_BD"

// Ejemplo de uso con selección y proyección
const sentenciasp = "{f.rut, f.nombre | Estudiantes_BD(f) ∧ f.Ingreso<2020}";
console.log("seleccion y proyeccion: ",conversorCalculo(sentenciasp))// "SELECT Nombre, Edad FROM Estudiantes_BD WHERE Ingreso < 2020"

// Ejemplo de uso con unión utilizando 'V'
const sentenciaUnionV = "{f.rut, f.nombre | Estudiantes_BD(f) ∧ f.Ingreso<2020} V {f.rut, f.nombre | Estudiantes_POO(f) ∧ f.Ingreso<2022}";
// Ejemplo de uso con unión utilizando 'U'
const sentenciaUnionU = "{f.rut, f.nombre | Estudiantes_BD(f) ∧ f.Ingreso<2020} U {f.rut, f.nombre | Estudiantes_POO(f) ∧ f.Ingreso<2022}";
console.log("union U: ", conversorCalculo(sentenciaUnionV)); // "SELECT rut, nombre FROM Estudiantes_BD WHERE Ingreso < 2020 UNION SELECT rut, nombre FROM Estudiantes_BI WHERE Ingreso < 2022"
console.log("union V: ", conversorCalculo(sentenciaUnionU)); // "SELECT rut, nombre FROM Estudiantes_BD WHERE Ingreso < 2020 UNION ALL SELECT rut, nombre FROM Estudiantes_BI WHERE Ingreso < 2022"