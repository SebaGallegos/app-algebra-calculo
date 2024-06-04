export function parseOperation(sentencia) {
  // Operación Union
  if (sentencia.includes(" U ") || sentencia.includes("\u222A")) {
    // Se divide en dos partes y se procesan recursivamente
    if (sentencia.includes(" U ")) {
      sentencia = sentencia.replace(" U ", " \u222A ");
    }
    const partes = sentencia.split(" \u222A ");
    const sql1 = parseOperation(partes[0]);
    const sql2 = parseOperation(partes[1]);
    if (sql1 && sql2) {
      return `${sql1} UNION ${sql2}`;
    } else {
      console.log("Operación de unión inválida:", sentencia);
      return null;
    }
  }

  // Operación intersección
  if (sentencia.includes(" ∩ ") || sentencia.includes(" \u2229 ")) {
    // Se divide en dos partes y se procesan recursivamente
    if (sentencia.includes(" ∩ ")) {
      sentencia = sentencia.replace(" ∩ ", " \u2229 ");
    }
    const partes = sentencia.split(" \u2229 ");
    const sql1 = parseOperation(partes[0]);
    const sql2 = parseOperation(partes[1]);
    if (sql1 && sql2) {
      return `${sql1} INTERSECT ${sql2}`;
    } else {
      console.log("Operación de intersección inválida:", sentencia);
      return null;
    }
  }

  // Operación diferencia
  if (sentencia.includes(" - ")) {
    // Se divide en dos partes y se procesan recursivamente
    const partes = sentencia.split(" - ");
    const sql1 = parseOperation(partes[0]);
    const sql2 = parseOperation(partes[1]);
    if (sql1 && sql2) {
      return `${sql1} EXCEPT ${sql2}`;
    } else {
      console.log("Operación de diferencia inválida:", sentencia);
      return null;
    }
  }

  // Si la sentencia es solo una tabla, se retorna un SELECT * FROM tabla
  if (/^\w+$/.test(sentencia)) {
    return `SELECT * FROM ${sentencia}`;
  }

  // Expresion regular que valida la estructura de la sentencia de la siguiente forma
  // operacion[condicion](tabla) - operacion[condicion](subconsulta)
  const match = sentencia.match(/^([^\s\[\]\(\)]+)(?:\[(.*?)\])?\((.*)\)$/);

  if (!match) {
    console.log("La orden no coincide:", sentencia);
    return null;
  }

  const operacion = match[1];
  const args = match[2];
  const tabla = match[3];
  console.log(`Sentencia: ${operacion}, Args: ${args}, Tabla: ${tabla}`);

  let sql;
  switch (operacion.toLowerCase()) {
    case "sel":
    case "\u03C3":
      if (args) {
        let condicion = args.replace(/\\"/g, '"').split(",").join(" AND ");
        sql = `SELECT * FROM ${tabla} WHERE ${condicion}`;
      } else {
        sql = `SELECT * FROM ${tabla}`;
      }
      break;
    case "proy":
    case "\u03C0":
      if (args) {
        let columnas = args.replace(/\\"/g, '"').split(",").join(", ");
        // Procesar recursivamente la subconsulta si existe
        const subMatch = tabla.match(
          /^([^\s\[\]\(\)]+)(?:\[(.*?)\])?\((.*)\)$/,
        );
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
