export function parseOperation(sentencia) {
    // Si la sentencia contiene ' U ', se trata de una operación de unión
    if (sentencia.includes(' U ')) {
        // Se divide en dos partes y se procesan recursivamente
        const partes = sentencia.split(' U ');
        const sql1 = parseOperation(partes[0]);
        const sql2 = parseOperation(partes[1]);
        if (sql1 && sql2) {
            return `${sql1} UNION ${sql2}`;
        } else {
            console.log("Operación de unión inválida:", sentencia);
            return null;
        }
    }

    // Check if the sentence contains ' ∩ ' (which represents intersection in your case)
    if (sentencia.includes(' ∩ ')) {
        const partes = sentencia.split(' ∩ ');
        const sql1 = parseOperation(partes[0]);
        const sql2 = parseOperation(partes[1]);
        if (sql1 && sql2) {
            return `${sql1} INTERSECT ${sql2}`;
        } else {
            console.log("Operación de intersección inválida:", sentencia);
            return null;
        }
    }

    // Si la sentencia es solo una tabla, se retorna un SELECT * FROM tabla
    if (/^\w+$/.test(sentencia)) {
        return `SELECT * FROM ${sentencia}`;
    }

    // Expresion regular que valida la estructura de la sentencia de la siguiente forma
    // operacion[condicion](tabla) - operacion[condicion](subconsulta)
    const match = sentencia.match(/^(\w+)(?:\[(.*?)\])?\((.*)\)$/);

    if (!match) {
        console.log("La orden no coincide:", sentencia);
        return null;
    }

    const [_, operacion, args, tabla] = match;
    console.log(`Sentencia: ${operacion}, Args: ${args}, Tabla: ${tabla}`);

    let sql;
    switch (operacion.toLowerCase()) {
        case "sel":
            if (args) {
                let condicion = args.replace(/\\"/g, '"').split(",").join(" AND ");
                sql = `SELECT * FROM ${tabla} WHERE ${condicion}`;
            } else {
                sql = `SELECT * FROM ${tabla}`;
            }
            break;
        case "proy":
            if (args) {
                let columnas = args.replace(/\\"/g, '"').split(",").join(", ");
                // Procesar recursivamente la subconsulta si existe
                const subMatch = tabla.match(/^(\w+)(?:\[(.*?)\])?\((.*)\)$/);
                if (subMatch) {
                    let subOp = parseOperation(tabla);
                    if (subOp) {
                        sql = `SELECT ${columnas} FROM (${subOp}) AS subquery`;
                    } else {
                        console.log("Sub-operación inválida:", tabla);
                        return null;
                    }
                } else {
                    sql = `SELECT ${columnas} FROM ${tabla}`;
                }
            }
            break;
        default:
            console.log("Operación no soportada:", operacion);
            return null;
    }

    console.log("SQL generado:", sql);
    return sql;
}