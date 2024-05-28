import Consulta from "./Consulta";

function parseOperation(operation) {
    // Ajuste del regex para capturar correctamente las subconsultas
    const match = operation.match(/^(\w+)(?:\[(.*?)\])?\((.*)\)$/);

    if (!match) {
        console.log('No match:', operation);
        return null;
    }

    const [_, op, args, table] = match;
    console.log(`Operation: ${op}, Args: ${args}, Table: ${table}`);

    let sql;
    switch (op.toLowerCase()) {
        case 'sel':
            if (args) {
                let cond = args.replace(/\\"/g, '"').split(',').join(' AND ');
                sql = `SELECT * FROM ${table} WHERE ${cond}`;
            } else {
                sql = `SELECT * FROM ${table}`;
            }
            break;
        case 'proy':
            if (args) {
                let columns = args.replace(/\\"/g, '"').split(',').join(', ');
                // Procesar recursivamente la subconsulta si existe
                const subMatch = table.match(/^(\w+)(?:\[(.*?)\])?\((.*)\)$/);
                if (subMatch) {
                    let subOp = parseOperation(table);
                    if (subOp) {
                        sql = `SELECT ${columns} FROM (${subOp}) AS subquery`;
                    } else {
                        console.log('Invalid sub-operation:', table);
                        return null;
                    }
                } else {
                    sql = `SELECT ${columns} FROM ${table}`;
                }
            }
            break;
        default:
            console.log('Operation not supported:', op);
            return null;
    }

    console.log('Generated SQL:', sql);
    return sql;
}

export default function Parser({ operation }) {
    const SQL = parseOperation(operation);
    return SQL ? <Consulta SQL={SQL} /> : null;
}
