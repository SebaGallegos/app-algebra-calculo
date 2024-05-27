import Consulta from "./Consulta";

export default function Parser({operation}) {
    const match = operation.match(/(\w+)(?:\[(.*?)\])?\((.*?)\)/);

    if (!match) {
        console.log('No match', match)
        return;
    }

    const [_, op, condition, table] = match;

    let sql;
    switch (op.toLowerCase()) {
        case 'sel':
            if(condition){
                let cond = condition.replace(/\\"/g, '"').split(',').join(' AND ');
                sql = `SELECT * FROM ${table} WHERE ${cond}`;
            } else{
                sql = `SELECT * FROM ${table}`;
            }
            break;
        default:
            console.log('Operation not supported')
            return;
    }

    return <Consulta SQL={sql} />;
}