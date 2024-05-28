import Consulta from "./Consulta";

function parseOperation(sentencia) {
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

export default function Parser({ sentencia }) {
  const SQL = parseOperation(sentencia);
  return SQL ? <Consulta SQL={SQL} /> : null;
}
